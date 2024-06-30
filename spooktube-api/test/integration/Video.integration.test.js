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
import ContentManagerService from "../../src/services/ContentManager.service.js";

import fs from "node:fs/promises";

describe("Video Integration Tests", () => {
    let server;
    let database;
    let requester;
    
    before(async () => {
        Config.load();
        const { PORT, HOST, DB_URI } = process.env;

        const videoRouter = new VideoRouter(new VideoController(new VideoService(), new ContentManagerService()));

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
        } catch (e) {
            console.log(e.message);
            throw new Error();
        }
        try {
            await Video.insertMany(existingVideos);
        } catch (e) {
            console.log(e.message);
            throw new Error();
        }
    });
    
    
    describe("getAllVideos", () => {
        it("should respond 200 in normal circumstances", async () => {
            //Act
            const actual = await requester.get("/videos/all/0/5");
            
            //Assert
            assert.equal(actual.status, 200);
            assert.equal(actual.body.videos.length, 5);
        });
        
        it("should respond 200 if rangeMax < collection size", async () => {
            //Act
            const actual = await requester.get("/videos/all/0/3");
            
            //Assert
            assert.equal(actual.status, 200);
            assert.equal(actual.body.videos.length, 3);
        });
        
        it("should respond 200 if rangeMin > zero", async () => {
            //Act
            const actual = await requester.get("/videos/all/1/5");
            
            //Assert
            assert.equal(actual.status, 200);
            assert.equal(actual.body.videos.length, 4);
            assert.equal(actual.body.videos[0].videoId, existingVideos[1].videoId);
        });
        
        it("should respond 200 if rangeMax > collection size", async () => {
            //Act
            const actual = await requester.get("/videos/all/0/6");
            
            //Assert
            assert.equal(actual.status, 200);
            assert.equal(actual.body.videos.length, 5);
        });
        
        it("should respond 200 if rangeMin < zero", async () => {
            //Act
            const actual = await requester.get("/videos/all/-1/5");
            
            //Assert
            assert.equal(actual.status, 200);
            assert.equal(actual.body.videos.length, 5);
        });
        
        it("should respond 500 if database offline", async () => {
            //Arrange
            await database.close();
            
            //Act
            const actual = await requester.get("/videos/all/0/5");
            
            //Assert
            assert.equal(actual.status, 500);
            
            //Cleanup
            await database.connect();
        });
    });
    
    describe("Upload Video", () => {
        it("should respond 201 in normal circumstances", async () => {
            //Arrange
            const file = await fs.readFile("test/data/videos/test.webm", { encoding: "base64url" });
            const dataUri = "data:video/webm;base64," + file;
            
            //Act
            const actual = await requester
                .get("/videos/post")
                .send({ videoFile: dataUri })
                .set("authentication", jwt.sign({ id: existingAccounts[0]._id }, process.env.SECRET));
            
            //Assert
            assert.equal(actual.status, 201);
            
            //Clean-Up
            const cms = new ContentManagerService();
            console.log(await cms.deleteVideo(actual.body.videoId));
        });
        
        it("should respond 500 with invalid file", async () => {
            //Arrange
            const file = "hello:)";
            
            //Act
            const actual = await requester
                .get("/videos/post")
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
                .get("/videos/post")
                .send({ videoFile: file })
                .set("authentication", jwt.sign({ id: existingAccounts[0]._id }, process.env.SECRET));
            
            //Assert
            assert.equal(actual.status, 500);
            
            //Cleanup
            await database.connect();
        });
    });
});