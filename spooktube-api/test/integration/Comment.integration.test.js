import supertest from "supertest";
import { assert } from "chai";

import Config from "../../src/config/Config.js";
import CommentController from "../../src/controllers/Comment.controller.js";
import CommentRouter from "../../src/routers/Comment.router.js";
import CommentService from "../../src/services/Comment.service.js";
import Server from "../../src/server/Server.js";
import Database from "../../src/database/Database.js";
import Comment from "../../src/models/Comment.model.js";
import Account from "../../src/models/Account.model.js";

import { existingComments, newComments } from "../data/testComments.js";
import { existingAccounts } from "../data/testAccounts.js";
import AccountService from "../../src/services/Account.service.js";

import jwt from "jsonwebtoken";

describe("Comment Integration Tests", () => {
    let server;
    let database;
    let requester;
    
    before(async () => {
        Config.load();
        const { PORT, HOST, DB_URI } = process.env;

        const commentRouter = new CommentRouter(new CommentController(new CommentService(), new AccountService));

        server = new Server(PORT, HOST, [commentRouter]);
        database = new Database(DB_URI);

        server.start();
        await database.connect();
        
        requester = supertest(server.getApp());
    });
    
    after(async () => {
        server.close();
        await database.close();
    });
    
    beforeEach(async () => {
        try {
            await Comment.deleteMany();
            await Account.deleteMany();
        } catch (e) {
            console.log(e.message);
            throw new Error();
        }
        try {
            await Comment.insertMany(existingComments);
            await Account.insertMany(existingAccounts);
        } catch (e) {
            console.log(e.message);
            throw new Error();
        }
    });
    
    describe("Get Video Comments", () => {
        it("should respond 200 in normal circumstances", async () => {
            //Act
            const actual = await requester.get("/comments/video/grhujedai");
            
            //Assert
            assert.equal(actual.status, 200);
            assert.equal(actual.body.comments.length, 4);
            assert.deepEqual(actual.body.comments[0], {
                _id: "668424a63fcba4ce70324371",
                comment: "Hello",
                videoId: "grhujedai",
                userId: {
                    username: "testuser2",
                    icon: "1",
                },
                timeCode: 43,
            },);
        });
        
        it("should respond 500 if database offline", async () => {
            //Arrange
            await database.close();
            
            //Act
            const actual = await requester.get("/comments/video/grhujedai");
            
            //Assert
            assert.equal(actual.status, 500);
            
            //Cleanup
            await database.connect();
        });
    });
    
    describe("Get User Comments", () => {
        it("should respond 200 in normal circumstances", async () => {
            //Act
            const actual = await requester
                .get("/comments/user/0/5")
                .set("authentication", jwt.sign({ id: existingAccounts[0]._id }, process.env.SECRET));
            
            //Assert
            assert.equal(actual.status, 200);
            assert.equal(actual.body.comments.length, 5);
            assert.deepEqual(actual.body.comments[0], {
                _id: "668424ddf0515e87b8f8a562",
                comment: "Hello2",
                videoId: "grhujedai",
                userId: {
                    username: "testuser1",
                    icon: "0",
                },
                timeCode: 43,
            });
        });
            
        it("should respond 200 if rangeMax > number of comments with matching userId", async () => {
            //Act
            const actual = await requester
                .get("/comments/user/0/10")
                .set("authentication", jwt.sign({ id: existingAccounts[0]._id }, process.env.SECRET));
        
            //Assert
            assert.equal(actual.status, 200);
            assert.equal(actual.body.comments.length, 5);
        });
    
        it("should respond 200 if rangeMax < collection size", async () => {
            //Act
            const actual = await requester
                .get("/comments/user/0/3")
                .set("authentication", jwt.sign({ id: existingAccounts[0]._id }, process.env.SECRET));
        
            //Assert
            assert.equal(actual.status, 200);
            assert.equal(actual.body.comments.length, 3);
        });
        
        it("should respond 200 if rangeMin > zero", async () => {
            //Act
            const actual = await requester
                .get("/comments/user/1/5")
                .set("authentication", jwt.sign({ id: existingAccounts[0]._id }, process.env.SECRET));;

            //Assert
            assert.equal(actual.status, 200);
            assert.equal(actual.body.comments.length, 4);
            assert.isFalse(actual.body.comments.some((comment) => comment.comment === existingComments[5].comment));
        });
        
        it("should respond 200 if rangeMax > collection size", async () => {
            //Act
            const actual = await requester
                .get("/comments/user/0/6")
                .set("authentication", jwt.sign({ id: existingAccounts[0]._id }, process.env.SECRET));;
            
            //Assert
            assert.equal(actual.status, 200);
            assert.equal(actual.body.comments.length, 5);
        });
        
        it("should respond 200 if rangeMin < zero", async () => {
            //Act
            const actual = await requester
                .get("/comments/user/-1/5")
                .set("authentication", jwt.sign({ id: existingAccounts[0]._id }, process.env.SECRET));;
            
            //Assert
            assert.equal(actual.status, 200);
            assert.equal(actual.body.comments.length, 5);
        });
    });
    
    describe("makeComment", () => {
        it("should respond 201 in normal circumstances", async () => {
            //Act
            const actual = await requester
                .post("/comments/post")
                .send({
                    comment: newComments.valid.comment,
                    videoId: newComments.valid.videoId,
                    timeCode: newComments.valid.timeCode
                })
                .set("authentication", jwt.sign({ id: newComments.valid.userId }, process.env.SECRET));
            
            //Assert
            assert.equal(actual.status, 201);
            assert.deepEqual(actual.body.comment.comment, newComments.valid.comment);
        });
        
        it("should respond 401 with no authentication header", async () => {
            //Act
            const actual = await requester
                .post("/comments/post")
                .send({
                    comment: newComments.valid.comment,
                    videoId: newComments.valid.videoId,
                    timeCode: newComments.valid.timeCode
                })
            
            //Assert
            assert.equal(actual.status, 401);
        });
        
        it("should respond 401 with invalid token", async () => {
            //Act
            const actual = await requester
                .post("/comments/post")
                .send({
                    comment: newComments.valid.comment,
                    videoId: newComments.valid.videoId,
                    timeCode: newComments.valid.timeCode
                })
                .set("authentication", { id: newComments.valid.userId });

            
            //Assert
            assert.equal(actual.status, 401);
        });
        
        it("should respond 400 with no comment", async () => {
            //Act
            const actual = await requester
                .post("/comments/post")
                .send({
                    comment: newComments.noComment.comment,
                    videoId: newComments.noComment.videoId,
                    timeCode: newComments.noComment.timeCode
                })
                .set("authentication", jwt.sign({ id: newComments.noComment.userId }, process.env.SECRET));
            
            //Assert
            assert.equal(actual.status, 400);
        });
        
        it("should respond 400 with empty comment", async () => {
            //Act
            const actual = await requester
                .post("/comments/post")
                .send({
                    comment: newComments.empty.comment,
                    videoId: newComments.empty.videoId,
                    timeCode: newComments.empty.timeCode
                })
                .set("authentication", jwt.sign({ id: newComments.empty.userId }, process.env.SECRET));
            
            //Assert
            assert.equal(actual.status, 400);
        });
        
        it("should respond 400 with comment longer than 500 characters", async () => {
            //Act
            const actual = await requester
                .post("/comments/post")
                .send({
                    comment: newComments.tooLong.comment,
                    videoId: newComments.tooLong.videoId,
                    timeCode: newComments.tooLong.timeCode
                })
                .set("authentication", jwt.sign({ id: newComments.tooLong.userId }, process.env.SECRET));
            
            //Assert
            assert.equal(actual.status, 400);
        });
        
        it("should respond 400 with no videoId", async () => {
            //Act
            const actual = await requester
                .post("/comments/post")
                .send({
                    comment: newComments.emptyVideoId.comment,
                    videoId: newComments.emptyVideoId.videoId,
                    timeCode: newComments.emptyVideoId.timeCode
                })
                .set("authentication", jwt.sign({ id: newComments.emptyVideoId.userId }, process.env.SECRET));
            
            //Assert
            assert.equal(actual.status, 400);
        });
        
        it("should respond 400 with empty videoId", async () => {
            //Act
            const actual = await requester
                .post("/comments/post")
                .send({
                    comment: newComments.noVideoId.comment,
                    videoId: newComments.noVideoId.videoId,
                    timeCode: newComments.noVideoId.timeCode
                })
                .set("authentication", jwt.sign({ id: newComments.noVideoId.userId }, process.env.SECRET));
            
            //Assert
            assert.equal(actual.status, 400);
        });
        
        it("should respond 400 with no timeCode", async () => {
            //Act
            const actual = await requester
                .post("/comments/post")
                .send({
                    comment: newComments.noTimeCode.comment,
                    videoId: newComments.noTimeCode.videoId,
                    timeCode: newComments.noTimeCode.timeCode
                })
                .set("authentication", jwt.sign({ id: newComments.noTimeCode.userId }, process.env.SECRET));
            
            //Assert
            assert.equal(actual.status, 400);
        });
        
        it("should respond 400 with timeCode < 0", async () => {
            //Act
            const actual = await requester
                .post("/comments/post")
                .send({
                    comment: newComments.lowTimeCode.comment,
                    videoId: newComments.lowTimeCode.videoId,
                    timeCode: newComments.lowTimeCode.timeCode
                })
                .set("authentication", jwt.sign({ id: newComments.lowTimeCode.userId }, process.env.SECRET));
            
            //Assert
            assert.equal(actual.status, 400);
        });
        
        it("should respond 400 with timeCode > 90", async () => {
            //Act
            const actual = await requester
                .post("/comments/post")
                .send({
                    comment: newComments.highTimeCode.comment,
                    videoId: newComments.highTimeCode.videoId,
                    timeCode: newComments.highTimeCode.timeCode
                })
                .set("authentication", jwt.sign({ id: newComments.highTimeCode.userId }, process.env.SECRET));
            
            //Assert
            assert.equal(actual.status, 400);
        });
        
        it("should respond 401 with no matching account", async () => {
            //Act
            const actual = await requester
                .post("/comments/post")
                .send({
                    comment: newComments.noMatchingUser.comment,
                    videoId: newComments.noMatchingUser.videoId,
                    timeCode: newComments.noMatchingUser.timeCode
                })
                .set("authentication", jwt.sign({ id: newComments.noMatchingUser.userId }, process.env.SECRET));
            
            //Assert
            assert.equal(actual.status, 401);
        });
        
        it("should respond 500 if database offline", async () => {
            //Arrange
            await database.close();
            
            //Act
            const actual = await requester
                .post("/comments/post")
                .send({
                    comment: newComments.valid.comment,
                    videoId: newComments.valid.videoId,
                    timeCode: newComments.valid.timeCode
                })
                .set("authentication", jwt.sign({ id: newComments.valid.userId }, process.env.SECRET));
            
            //Assert
            assert.equal(actual.status, 500);
            
            //Clean-up
            await database.connect();
        });
    });
    
    describe("Edit Comment", () => {
        it("should respond 204 in normal circumstances", async () => {
            //Act
            const actual = await requester
                .put("/comments")
                .send({
                    id: existingComments[4]._id,
                    newComment: newComments.valid.comment
                })
                .set("authentication", jwt.sign({ id: existingComments[4].userId }, process.env.SECRET));
            
            //Assert
            const comment = await Comment.findById(existingComments[4]._id);
            assert.equal(actual.status, 204);
            assert.equal(comment.comment, newComments.valid.comment);
        });
        
        it("should respond 404 if userId is wrong", async () => {
            //Act
            const actual = await requester
                .put("/comments")
                .send({
                    id: existingComments[4]._id,
                    newComment: newComments.valid.comment
                })
                .set("authentication", jwt.sign({ id: existingComments[5].userId }, process.env.SECRET));
            
            //Assert
            const comment = await Comment.findById(existingComments[4]._id);
            assert.equal(actual.status, 404);
            assert.equal(comment.comment, existingComments[4].comment);
        });
        
        it("should respond 204 if user is moderator", async () => {
            //Act
            const actual = await requester
                .put("/comments")
                .send({
                    id: existingComments[4]._id,
                    newComment: newComments.valid.comment
                })
                .set("authentication", jwt.sign({ id: existingAccounts[1]._id }, process.env.SECRET));
            
            //Assert
            assert.equal(actual.status, 204);
        });
    });
    
    describe("Delete Comment", () => {
        it("should respond 204 in normal circumstances", async () => {
            //Act
            const actual = await requester
                .delete("/comments")
                .send({
                    id: existingComments[4]._id,
                })
                .set("authentication", jwt.sign({ id: existingComments[4].userId }, process.env.SECRET));
            
            //Assert
            const comment = await Comment.findById(existingComments[4]._id);
            assert.isNull(comment);
            assert.equal(actual.status, 204);
        });
    })
});
