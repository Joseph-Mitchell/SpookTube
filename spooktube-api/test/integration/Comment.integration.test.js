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
    
    
    describe("getVideoComments", () => {
        it("should respond 200 in normal circumstances", async () => {
            //Act
            const actual = await requester.get("/comments/video/grhujedai");
            
            //Assert
            assert.equal(actual.status, 200);
            assert.equal(actual.body.comments.length, 2);
            assert.deepEqual(actual.body.comments[0], {
                comment: "Hello",
                videoId: "grhujedai",
                userId: {
                    username: "testuser1",
                    icon: "0",
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
    });
});