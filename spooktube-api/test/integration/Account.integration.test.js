import supertest from "supertest";
import { assert } from "chai";

import Config from "../../src/config/Config.js";
import AccountController from "../../src/controllers/Account.controller.js";
import AccountRouter from "../../src/routers/Account.router.js";
import AccountService from "../../src/services/Account.service.js";
import Server from "../../src/server/Server.js";
import Database from "../../src/database/Database.js";
import Account from "../../src/models/Account.model.js";

import { existingAccounts } from "../data/testAccounts.js";

describe("Comment Integration Tests", () => {
    let server;
    let database;
    let requester;
    
    before(async () => {
        Config.load();
        const { PORT, HOST, DB_URI } = process.env;

        const accountRouter = new AccountRouter(new AccountController(new AccountService()));

        server = new Server(PORT, HOST, [accountRouter]);
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
            await Account.deleteMany();
        } catch (e) {
            console.log(e.message);
            throw new Error();
        }
        try {
            await Account.insertMany(existingAccounts);
        } catch (e) {
            console.log(e.message);
            throw new Error();
        }
    });
});