import supertest from "supertest";
import { assert } from "chai";

import Config from "../../src/config/Config.js";
import VideoController from "../../src/controllers/Video.controller.js";
import VideoRouter from "../../src/routers/Video.router.js";
import VideoService from "../../src/services/Video.service.js";
import Server from "../../src/server/Server.js";
import Database from "../../src/database/Database.js";
import Video from "../../src/models/Video.model.js";

import jwt from "jsonwebtoken";

import { existingVideos } from "../data/testVideos.js";
import { existingAccounts } from "../data/testAccounts.js";
import { roles } from "../data/testRoles.js";
import ContentManagerService from "../../src/services/ContentManager.service.js";

import fs from "node:fs/promises";
import AccountService from "../../src/services/Account.service.js";
import Account from "../../src/models/Account.model.js";
import Role from "../../src/models/Role.model.js";
import { dataUriToBuffer } from "data-uri-to-buffer";

import cloudinary from "cloudinary";

describe("Video Integration Tests", () => {
    let server;
    let database;
    let requester;
    
    before(async () => {
        Config.load();
        const { PORT, HOST, DB_URI } = process.env;

        const videoRouter = new VideoRouter(new VideoController(new VideoService(), new ContentManagerService(), new AccountService()));

        server = new Server(PORT, HOST, [videoRouter]);
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
            await Video.deleteMany();
            await Account.deleteMany();
            await Role.deleteMany();
        } catch (e) {
            console.log(e.message);
            throw new Error();
        }
        try {
            await Video.insertMany(existingVideos);
            await Account.insertMany(existingAccounts);
            await Role.insertMany(roles);
        } catch (e) {
            console.log(e.message);
            throw new Error();
        }
    });
    
    describe("Get All Videos", () => {
        it("should respond 200 in normal circumstances", async () => {
            //Act
            const actual = await requester.get("/videos/all/0/10");
            
            //Assert
            assert.equal(actual.status, 200);
            assert.equal(actual.body.videos.length, 10);
        });
        
        it("should respond 200 if rangeMax < collection size", async () => {
            //Act
            const actual = await requester.get("/videos/all/0/7");
            
            //Assert
            assert.equal(actual.status, 200);
            assert.equal(actual.body.videos.length, 7);
        });
        
        it("should respond 200 if rangeMin > zero", async () => {
            //Act
            const actual = await requester.get("/videos/all/1/10");
            
            //Assert
            assert.equal(actual.status, 200);
            assert.equal(actual.body.videos.length, 9);
            assert.isFalse(actual.body.videos.some((video) => video.videoId === existingVideos[0].videoId));
        });
        
        it("should respond 200 if rangeMax > collection size", async () => {
            //Act
            const actual = await requester.get("/videos/all/0/11");
            
            //Assert
            assert.equal(actual.status, 200);
            assert.equal(actual.body.videos.length, 10);
        });
        
        it("should respond 200 if rangeMin < zero", async () => {
            //Act
            const actual = await requester.get("/videos/all/-1/10");
            
            //Assert
            assert.equal(actual.status, 200);
            assert.equal(actual.body.videos.length, 10);
        });
        
        it("should respond 500 if database offline", async () => {
            //Arrange
            await database.close();
            
            //Act
            const actual = await requester.get("/videos/all/0/10");
            
            //Assert
            assert.equal(actual.status, 500);
            
            //Cleanup
            await database.connect();
        });
    });
    
    describe("Get User Videos", () => {
        it("should respond 200 in normal circumstances", async () => {
            //Act
            const actual = await requester
                .get("/videos/user/0/5")
                .set("authentication", jwt.sign({ id: existingAccounts[0]._id }, process.env.SECRET));
            
            //Assert
            assert.equal(actual.status, 200);
            assert.equal(actual.body.videos.length, 5);
        });
        
        it("should respond 200 if rangeMax > number of videos with matching userId", async () => {
            //Act
            const actual = await requester
                .get("/videos/user/0/10")
                .set("authentication", jwt.sign({ id: existingAccounts[0]._id }, process.env.SECRET));
            
            //Assert
            assert.equal(actual.status, 200);
            assert.equal(actual.body.videos.length, 5);
        });
        
        it("should respond 200 if rangeMax < collection size", async () => {
            //Act
            const actual = await requester
                .get("/videos/user/0/3")
            .set("authentication", jwt.sign({ id: existingAccounts[0]._id }, process.env.SECRET));
            
            //Assert
            assert.equal(actual.status, 200);
            assert.equal(actual.body.videos.length, 3);
        });
        
        it("should respond 200 if rangeMin > zero", async () => {
            //Act
            const actual = await requester
                .get("/videos/user/1/5")
                .set("authentication", jwt.sign({ id: existingAccounts[0]._id }, process.env.SECRET));;
            
            //Assert
            assert.equal(actual.status, 200);
            assert.equal(actual.body.videos.length, 4);
            assert.isFalse(actual.body.videos.some((video) => video.videoId === existingVideos[0].videoId));
        });
        
        it("should respond 200 if rangeMax > collection size", async () => {
            //Act
            const actual = await requester
                .get("/videos/user/0/6")
                .set("authentication", jwt.sign({ id: existingAccounts[0]._id }, process.env.SECRET));;
            
            //Assert
            assert.equal(actual.status, 200);
            assert.equal(actual.body.videos.length, 5);
        });
        
        it("should respond 200 if rangeMin < zero", async () => {
            //Act
            const actual = await requester
                .get("/videos/user/-1/5")
                .set("authentication", jwt.sign({ id: existingAccounts[0]._id }, process.env.SECRET));;
            
            //Assert
            assert.equal(actual.status, 200);
            assert.equal(actual.body.videos.length, 5);
        });
        
        it("should respond 500 if database offline", async () => {
            //Arrange
            await database.close();
            
            //Act
            const actual = await requester
                .get("/videos/user/0/5")
                .set("authentication", jwt.sign({ id: existingAccounts[0]._id }, process.env.SECRET));;
            
            //Assert
            assert.equal(actual.status, 500);
            
            //Cleanup
            await database.connect();
        });
    });
    
    describe.skip("Upload Video", () => {
        it("should respond 201 in normal circumstances", async () => {
            //Arrange
            const file = await fs.readFile("test/data/videos/test.webm", { encoding: "base64url" });
            const dataUri = "data:video/webm;base64," + file;
            
            //Act
            const actual = await requester
                .post("/videos/post")
                .send({ videoFile: dataUri })
                .set("authentication", jwt.sign({ id: existingAccounts[0]._id }, process.env.SECRET));
            
            //Assert
            assert.equal(actual.status, 201);
            
            //Clean-Up
            const cms = new ContentManagerService();
            await cms.deleteVideo(actual.body.videoId);
        });
        
        it("should respond 500 with invalid file", async () => {
            //Arrange
            const file = "hello:)";
            
            //Act
            const actual = await requester
                .post("/videos/post")
                .send({ videoFile: file })
                .set("authentication", jwt.sign({ id: existingAccounts[0]._id }, process.env.SECRET));
            
            //Assert
            assert.equal(actual.status, 500);
        });
        
        it("should respond 500 if database is offline", async () => {
            //Arrange
            await database.close();
            const file = await fs.readFile("test/data/videos/test.webm", { encoding: "base64url" });
            const dataUri = "data:video/webm;base64," + file;
            
            //Act
            const actual = await requester
                .post("/videos/post")
                .send({ videoFile: file })
                .set("authentication", jwt.sign({ id: existingAccounts[0]._id }, process.env.SECRET));
            
            //Assert
            assert.equal(actual.status, 500);
            
            //Cleanup
            await database.connect();
        });
    });
    
    describe("Delete Video", () => {   
        beforeEach(async () => {
            const file = await fs.readFile("test/data/videos/test.webm", { encoding: "base64url" });
            const dataUri = "data:video/webm;base64," + file;
            
            await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream((result, error) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(result);
                }, {
                    public_id: existingVideos[5].videoId,
                    resource_type: "video",
                    use_filename: false,
                    overwrite: false,
                    folder: process.env.CLOUDINARY_FOLDER
                }).end(Buffer.from(dataUriToBuffer(dataUri).buffer));
            });
        });
        
        afterEach(async () => {
            await cloudinary.v2.uploader.destroy("Test/" + existingVideos[5].videoId, {
                resource_type: "video",
            });
        })
        
        it("should respond 204 in normal circumstances", async () => {
            //Act
            const actual = await requester
                .delete("/videos/delete")
                .send({ videoId: existingVideos[5].videoId })
                .set("authentication", jwt.sign({ id: existingVideos[5].userId }, process.env.SECRET));

            //Assert
            assert.equal(actual.status, 204);
        });
                
        it("should respond 404 with wrong userId", async () => {
            //Act
            const actual = await requester
                .delete("/videos/delete")
                .send({ videoId: existingVideos[5].videoId })
                .set("authentication", jwt.sign({ id: existingVideos[2].userId }, process.env.SECRET));

            //Assert
            assert.equal(actual.status, 404);
        });
        
        it("should respond 204 with moderator userId", async () => {
            //Act
            const actual = await requester
                .delete("/videos/delete")
                .send({ videoId: existingVideos[5].videoId })
                .set("authentication", jwt.sign({ id: existingVideos[0].userId }, process.env.SECRET));

            //Assert
            assert.equal(actual.status, 204);
        });
    })
});