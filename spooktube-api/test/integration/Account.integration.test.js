import supertest from "supertest";
import { assert } from "chai";

import Config from "../../src/config/Config.js";
import AccountController from "../../src/controllers/Account.controller.js";
import AccountRouter from "../../src/routers/Account.router.js";
import AccountService from "../../src/services/Account.service.js";
import Server from "../../src/server/Server.js";
import Database from "../../src/database/Database.js";
import Account from "../../src/models/Account.model.js";

import { existingAccounts, newAccounts, testLogins } from "../data/testAccounts.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

describe("Account Integration Tests", () => {
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
            let encryptedAccounts = [];
            existingAccounts.forEach((account) => {
                account = { ...account }; //Clone each account to not overwrite test data
                account.password = bcrypt.hashSync(account.password, 8);
                encryptedAccounts.push(account);
            });
            await Account.insertMany(encryptedAccounts);
        } catch (e) {
            console.log(e.message);
            throw new Error();
        }
    });
    
    describe("Register Account", () => {
        it("should respond 201 in normal circumstances", async () => {
            //Act
            const actual = await requester.post("/accounts/register").send(newAccounts.valid);
            
            //Assert
            assert.equal(actual.status, 201);
            assert.isOk(jwt.verify(actual.body.token, process.env.SECRET));
        });
        
        it("should respond 400 if username not given", async () => {
            //Act
            const actual = await requester.post("/accounts/register").send(newAccounts.noUsername);
            
            //Assert
            assert.equal(actual.status, 400);
        });
        
        it("should respond 400 if username empty", async () => {
            //Act
            const actual = await requester.post("/accounts/register").send(newAccounts.emptyUsername);
            
            //Assert
            assert.equal(actual.status, 400);
        });
        
        it("should respond 400 if email not given", async () => {
            //Act
            const actual = await requester.post("/accounts/register").send(newAccounts.noEmail);
            
            //Assert
            assert.equal(actual.status, 400);
        });
        
        it("should respond 400 if email empty", async () => {
            //Act
            const actual = await requester.post("/accounts/register").send(newAccounts.emptyEmail);
            
            //Assert
            assert.equal(actual.status, 400);
        });
        
        it("should respond 400 if email invalid", async () => {
            //Act
            const actual = await requester.post("/accounts/register").send(newAccounts.invalidEmail);
            
            //Assert
            assert.equal(actual.status, 400);
        });
        
        it("should respond 400 if password not given", async () => {
            //Act
            const actual = await requester.post("/accounts/register").send(newAccounts.noPassword);
            
            //Assert
            assert.equal(actual.status, 400);
        });
        
        it("should respond 400 if password empty", async () => {
            //Act
            const actual = await requester.post("/accounts/register").send(newAccounts.emptyPassword);
            
            //Assert
            assert.equal(actual.status, 400);
        });
        
        it("should respond 409 if username already exists", async () => {
            //Act
            const actual = await requester.post("/accounts/register").send(newAccounts.existingUsername);
            
            //Assert
            assert.equal(actual.status, 409);
        });
        
        it("should respond 409 if email already exists", async () => {
            //Act
            const actual = await requester.post("/accounts/register").send(newAccounts.existingEmail);
            
            //Assert
            assert.equal(actual.status, 409);
        });
        
        it("should respond 500 if database offline", async () => {
            //Arrange
            await database.close();
            
            //Act
            const actual = await requester.post("/accounts/register").send(newAccounts.valid);
            
            //Assert
            assert.equal(actual.status, 500);
            
            //Clean-up
            await database.connect();
        });
    });
    
    describe("Login Account", () => {
        it("should respond 200 when authenticating with email", async () => {
            //Act
            const actual = await requester.post("/accounts/login").send(testLogins.withEmail);
            
            //Assert
            assert.equal(actual.status, 200);
            assert.isOk(jwt.verify(actual.body.token, process.env.SECRET));
        });
        
        it("should respond 200 when authenticating with username", async () => {
            //Act
            const actual = await requester.post("/accounts/login").send(testLogins.withUsername);
            
            //Assert
            assert.equal(actual.status, 200);
            assert.isOk(jwt.verify(actual.body.token, process.env.SECRET));
        });
        
        it("should respond 404 when identifier matches none", async () => {
            //Act
            const actual = await requester.post("/accounts/login").send(testLogins.withNoMatch);
            
            //Assert
            assert.equal(actual.status, 404);
        });
        
        it("should respond 404 when password incorrect", async () => {
            //Act
            const actual = await requester.post("/accounts/login").send(testLogins.withWrongPass);
            
            //Assert
            assert.equal(actual.status, 404);
        });
        
        it("should respond 500 if database offline", async () => {
            //Arrange
            await database.close();
            
            //Act
            const actual = await requester.post("/accounts/login").send(testLogins.withEmail);
            
            //Assert
            assert.equal(actual.status, 500);
            
            //Clean-up
            await database.connect();
        });
    });
    
    describe("Login With Token", () => {
        it("should respond 200 when authenticating with email", async () => {
            //Act
            const actual = await requester
                .post("/accounts/token-login")
                .set("authentication", jwt.sign({ id: existingAccounts[0]._id }, process.env.SECRET));
            
            //Assert
            assert.equal(actual.status, 200);
        });
                
        it("should respond 404 with unmatching id", async () => {
            //Act
            const actual = await requester
                .post("/accounts/token-login")
                .set("authentication", jwt.sign({ id: "667a07de7ef68e8b25ffa8d9" }, process.env.SECRET));
            
            //Assert
            assert.equal(actual.status, 404);
        });
    });
    
    describe("Update Profile", () => {
        it("should respond 204 in normal circumstances", async () => {
            //Act
            const actual = await requester
                .put("/accounts/profile")
                .send({ username: newAccounts.valid.username, icon: "5" })
                .set("authentication", jwt.sign({ id: existingAccounts[0]._id }, process.env.SECRET));
            
            //Assert
            const account = await Account.findById(existingAccounts[0]._id);

            assert.equal(actual.status, 204);
            assert.equal(account.username, newAccounts.valid.username);
            assert.equal(account.icon, "5");
        });
        
        it("should respond 400 with no username", async () => {
            //Act
            const actual = await requester
                .put("/accounts/profile")
                .send({ icon: "5" })
                .set("authentication", jwt.sign({ id: existingAccounts[0]._id }, process.env.SECRET));
            
            //Assert
            const account = await Account.findById(existingAccounts[0]._id);

            assert.equal(actual.status, 400);
            assert.equal(account.username, existingAccounts[0].username);
            assert.equal(account.icon, "0");
        });
        
        it("should respond 400 with empty username", async () => {
            //Act
            const actual = await requester
                .put("/accounts/profile")
                .send({ username: newAccounts.emptyUsername.username, icon: "5" })
                .set("authentication", jwt.sign({ id: existingAccounts[0]._id }, process.env.SECRET));
            
            //Assert
            const account = await Account.findById(existingAccounts[0]._id);

            assert.equal(actual.status, 400);
            assert.equal(account.username, existingAccounts[0].username);
            assert.equal(account.icon, "0");
        });
        
        it("should respond 400 with no icon", async () => {
            //Act
            const actual = await requester
                .put("/accounts/profile")
                .send({ username: newAccounts.valid.username })
                .set("authentication", jwt.sign({ id: existingAccounts[0]._id }, process.env.SECRET));
            
            //Assert
            const account = await Account.findById(existingAccounts[0]._id);

            assert.equal(actual.status, 400);
            assert.equal(account.username, existingAccounts[0].username);
            assert.equal(account.icon, "0");
        });
        
        it("should respond 400 with empty icon", async () => {
            //Act
            const actual = await requester
                .put("/accounts/profile")
                .send({ username: newAccounts.valid.username, icon: "" })
                .set("authentication", jwt.sign({ id: existingAccounts[0]._id }, process.env.SECRET));
            
            //Assert
            const account = await Account.findById(existingAccounts[0]._id);

            assert.equal(actual.status, 400);
            assert.equal(account.username, existingAccounts[0].username);
            assert.equal(account.icon, "0");
        });
        
        it("should respond 404 with unknown user id", async () => {
            //Act
            const actual = await requester
                .put("/accounts/profile")
                .send({ username: newAccounts.valid.username, icon: "5" })
                .set("authentication", jwt.sign({ id: "668529d3d52abbef90c9305c" }, process.env.SECRET));
            
            //Assert
            assert.equal(actual.status, 404);
        });
    });
    
    describe("Update Email", () => {
        it("should respond 204 in normal circumstances", async () => {
            //Act
            const actual = await requester
                .put("/accounts/email")
                .send({ oldEmail: existingAccounts[0].email, newEmail: newAccounts.valid.email })
                .set("authentication", jwt.sign({ id: existingAccounts[0]._id }, process.env.SECRET));
            
            //Assert
            const account = await Account.findById(existingAccounts[0]._id);
            assert.equal(actual.status, 204);
            assert.equal(account.email, newAccounts.valid.email);
        });
        
        it("should respond 400 with no oldEmail", async () => {
            //Act
            const actual = await requester
                .put("/accounts/email")
                .send({ newEmail: newAccounts.valid.email })
                .set("authentication", jwt.sign({ id: existingAccounts[0]._id }, process.env.SECRET));
            
            //Assert
            const account = await Account.findById(existingAccounts[0]._id);
            assert.equal(actual.status, 400);
            assert.equal(account.email, existingAccounts[0].email);
        });
    });
});