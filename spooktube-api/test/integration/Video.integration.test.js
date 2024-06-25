import supertest from "supertest";
import { assert } from "chai";

import Config from "../../src/config/Config.js";
import VideoController from "../../src/controllers/Video.controller.js";
import VideoRouter from "../../src/routers/Video.router.js";
import VideoService from "../../src/services/Video.service.js";
import Server from "../../src/server/Server.js";
import Database from "../../src/database/Database.js";
import Video from "../../src/models/Video.model.js";

import { existingVideos } from "../data/testVideos.js";

describe("Video Integration Tests", () => {
    let server;
    let database;
    let requester;
    
    before(async () => {
        Config.load();
        const { PORT, HOST, DB_URI } = process.env;

        const videoRouter = new VideoRouter(new VideoController(new VideoService()));

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
        it("should call respond 200 in normal circumstances", async () => {
            //Act
            const actual = await requester.get("/videos/all/0/5");
            
            //Assert
            assert.equal(actual.status, 200);
            assert.equal(actual.body.length, 5);
        });
    });
});