import sinon from "sinon";
import { assert } from "chai";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import AccountController from "../../src/controllers/Account.controller.js";

describe("Account Controller", () => {
    let stubbedService;
    let stubbedResponse;
    let testController;
    let testRequest;
    let testAccount;
    
    describe("registerAccount", () => {
        beforeEach(() => {
            process.env.SECRET = "333BA566A25119A247F6FD4845E98";
            
            stubbedService = {
                getAccountByEmail: sinon.stub(),
                getAccountByUsername: sinon.stub(),
                createAccount: sinon.stub()
            };
            stubbedResponse = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };
            
            testController = new AccountController(stubbedService);
            testAccount = { _id: 1, username: "testUsername", email: "test@email.com", password: "testPass" };       
            testRequest = { body: testAccount };
            
            stubbedService.getAccountByEmail.resolves(null);
            stubbedService.getAccountByUsername.resolves(null);
            stubbedService.createAccount.resolves(testAccount);
        });
        
        afterEach(() => {
            process.env.SECRET = undefined;
            stubbedService = undefined;
            stubbedResponse = undefined;
            testController = undefined;
            testRequest = undefined;
            testAccount = undefined;
        });
        
        it("should respond with 201 in normal circumstances", async () => {
            //Act
            await testController.registerAccount(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledWith(stubbedService.getAccountByEmail, testAccount.email);
            sinon.assert.calledWith(stubbedService.getAccountByUsername, testAccount.username);
            sinon.assert.calledWith(stubbedService.createAccount, testAccount.email, testAccount.username, testAccount.password);
            sinon.assert.calledWith(stubbedResponse.status, 201);
            assert.equal(jwt.verify(stubbedResponse.json.getCall(0).args[0].token, process.env.SECRET).id, testAccount._id)
        });
                
        it("should respond with 409 if getAccountByEmail doesn't resolve null", async () => {
            //Arrange
            stubbedService.getAccountByEmail.resolves({});
            
            //Act
            await testController.registerAccount(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledWith(stubbedResponse.status, 409);
        });
        
        it("should respond with 409 if getAccountByUsername doesn't resolve null", async () => {
            //Arrange
            stubbedService.getAccountByUsername.resolves({});
            
            //Act
            await testController.registerAccount(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledWith(stubbedResponse.status, 409);
        });
        
        it("should respond with 500 if getAccountByEmail rejects", async () => {
            //Arrange
            stubbedService.getAccountByEmail.rejects(new Error());
            
            //Act
            await testController.registerAccount(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledWith(stubbedResponse.status, 500);
        });
        
        it("should respond with 500 if getAccountByUsername rejects", async () => {
            //Arrange
            stubbedService.getAccountByUsername.rejects(new Error());
            
            //Act
            await testController.registerAccount(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledWith(stubbedResponse.status, 500);
        });
        
        it("should respond with 500 if createAccount rejects", async () => {
            //Arrange
            stubbedService.createAccount.rejects(new Error());
            
            //Act
            await testController.registerAccount(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledWith(stubbedResponse.status, 500);
        });
    });
    
    describe("loginAccount", () => {
        let testPass;
        
        beforeEach(() => {
            process.env.SECRET = "333BA566A25119A247F6FD4845E98";
            
            stubbedService = {
                getAccountByIdentifier: sinon.stub(),
            };
            stubbedResponse = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };
            
            testController = new AccountController(stubbedService);
            testPass = "testPass";
            testAccount = { _id: 1, username: "testUsername", email: "test@email.com", password: bcrypt.hashSync("testPass", 8) };       
            testRequest = { body: { identifier: "testUsername", password: "testPass" } };
            
            stubbedService.getAccountByIdentifier.resolves(testAccount);
        });
        
        afterEach(() => {
            process.env.SECRET = undefined;
            stubbedService = undefined;
            stubbedResponse = undefined;
            testController = undefined;
            testPass = undefined;
            testRequest = undefined;
            testAccount = undefined;
        });
        
        it("should respond with 201 in normal circumstances", async () => {
            //Act
            await testController.loginAccount(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledWith(stubbedService.getAccountByIdentifier, "testUsername");
            sinon.assert.calledWith(stubbedResponse.status, 200);
            assert.equal(jwt.verify(stubbedResponse.json.getCall(0).args[0].token, process.env.SECRET).id, testAccount._id)
        });
    });
});