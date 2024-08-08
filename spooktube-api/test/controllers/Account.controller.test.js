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
                getRoleById: sinon.stub(),
                getAccountByIdentifier: sinon.stub(),
                createAccount: sinon.stub()
            };
            stubbedResponse = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };
            
            testController = new AccountController(stubbedService);
            testAccount = { _id: 1, username: "testUsername", email: "test@email.com", password: "testPass" };       
            testRequest = { body: testAccount };
            
            stubbedService.getRoleById.resolves({ role: { roleName: "" } });
            stubbedService.getAccountByIdentifier.resolves(null);
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
            sinon.assert.calledWith(stubbedService.getAccountByIdentifier, testAccount.email);
            sinon.assert.calledWith(stubbedService.createAccount, testAccount.email, testAccount.username, testAccount.password);
            sinon.assert.calledWith(stubbedResponse.status, 201);
            assert.equal(jwt.verify(stubbedResponse.json.getCall(0).args[0].token, process.env.SECRET).id, testAccount._id)
        });
                
        it("should respond with 409 if getAccountByIdentifier doesn't resolve null", async () => {
            //Arrange
            stubbedService.getAccountByIdentifier.resolves({});
            
            //Act
            await testController.registerAccount(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledWith(stubbedResponse.status, 409);
        });
        
        it("should respond with 500 if getAccountByIdentifier rejects", async () => {
            //Arrange
            stubbedService.getAccountByIdentifier.rejects(new Error());
            
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
            testAccount = { _id: 1, username: "testUsername", email: "test@email.com", password: bcrypt.hashSync("testPass", 8), role: { roleName: ""} };       
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
        
        it("should respond with 200 in normal circumstances", async () => {
            //Act
            await testController.loginAccount(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledWith(stubbedService.getAccountByIdentifier, "testUsername");
            sinon.assert.calledWith(stubbedResponse.status, 200);
            assert.equal(jwt.verify(stubbedResponse.json.getCall(0).args[0].token, process.env.SECRET).id, testAccount._id)
        });
        
        it("should respond with 404 if _service.getAccountByIdentifier resolves null", async () => {
            //Arrange
            stubbedService.getAccountByIdentifier.resolves(null)
            
            //Act
            await testController.loginAccount(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledWith(stubbedResponse.status, 404);
        });
        
        it("should respond with 404 if passwords don't match", async () => {
            //Arrange
            testRequest.body.password = "notPass"
            
            //Act
            await testController.loginAccount(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledWith(stubbedResponse.status, 404);
        });
        
        it("should respond with 500 if _service.getAccountByIdentifier rejects", async () => {
            //Arrange
            stubbedService.getAccountByIdentifier.rejects(new Error())
            
            //Act
            await testController.loginAccount(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledWith(stubbedResponse.status, 500);
        });
    });
    
    describe("loginWithToken", () => {
        beforeEach(() => {           
            stubbedService = {
                getAccountById: sinon.stub(),
            };
            stubbedResponse = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };
            
            testController = new AccountController(stubbedService);
            testAccount = { _id: 1, username: "testUsername", icon: "0", role: { roleName: "" } };
            testRequest = { body: { userId: "1" } };
            
            stubbedService.getAccountById.resolves(testAccount);
        });
        
        afterEach(() => {
            stubbedService = undefined;
            stubbedResponse = undefined;
            testController = undefined;
            testRequest = undefined;
            testAccount = undefined;
        });
        
        it("should respond with 200 in normal circumstances", async () => {
            //Act
            await testController.loginWithToken(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledWith(stubbedService.getAccountById, "1");
            sinon.assert.calledWith(stubbedResponse.status, 200);
            assert.equal(stubbedResponse.json.getCall(0).args[0].username, testAccount.username);
        });
        
        it("should respond with 404 if getAccountById resolves null", async () => {
            //Arrange
            stubbedService.getAccountById.resolves(null);
            
            //Act
            await testController.loginWithToken(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledWith(stubbedResponse.status, 404);
        });
        
        it("should respond with 500 if getAccountById rejects", async () => {
            //Arrange
            stubbedService.getAccountById.rejects(new Error());
            
            //Act
            await testController.loginWithToken(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledWith(stubbedResponse.status, 500);
        });
    });
    
    describe("updateProfileDetails", () => {
        beforeEach(() => {      
            stubbedService = {
                getAccountById: sinon.stub(),
                updateProfileDetails: sinon.stub()
            };
            stubbedResponse = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };
            
            testController = new AccountController(stubbedService);
            testAccount = { _id: 1, username: "testUsername", iconText: ":O", iconColour: "#ffffff", role: { roleName: "" } };
            testRequest = { body: { userId: "1", username: "testName", iconText: ":)", iconColour: "#ff0000" } };
            
            stubbedService.getAccountById.resolves(testAccount);
        });
        
        afterEach(() => {
            stubbedService = undefined;
            stubbedResponse = undefined;
            testController = undefined;
            testRequest = undefined;
            testAccount = undefined;
        });
        
        it("should respond with 200 in normal circumstances", async () => {
            //Act
            await testController.updateProfileDetails(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledWith(stubbedService.getAccountById, testRequest.body.userId);
            sinon.assert.calledWith(stubbedService.updateProfileDetails, testRequest.body.userId, testRequest.body.username, testRequest.body.iconText, testRequest.body.iconColour);
            sinon.assert.calledWith(stubbedResponse.status, 204);
        });
        
        it("should respond with 404 if getByAccountId resolves null", async () => {
            //Arrange
            stubbedService.getAccountById.resolves(null);
            
            //Act
            await testController.updateProfileDetails(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.notCalled(stubbedService.updateProfileDetails);
            sinon.assert.calledWith(stubbedResponse.status, 404);
        });
    });
    
    describe("updateEmail", () => {
        beforeEach(() => {     
            stubbedService = {
                getAccountByIdAndEmail: sinon.stub(),
                updateEmail: sinon.stub(),
            };
            stubbedResponse = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };
            
            testController = new AccountController(stubbedService);
            testAccount = { _id: 1, username: "testUsername", email: "test@email.com", password: "testPass" };
            testRequest = { body: { userId: 1, oldEmail: "old@email.com", newEmail: "new@email.com"} };
            
            stubbedService.getAccountByIdAndEmail.resolves(testAccount);
        });
        
        afterEach(() => {
            stubbedService = undefined;
            stubbedResponse = undefined;
            testController = undefined;
            testRequest = undefined;
            testAccount = undefined;
        });
        
        it("should respond 204 in normal circumstances", async () => {
            //Act
            await testController.updateEmail(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledWith(stubbedResponse.status, 204);
            sinon.assert.calledWith(stubbedService.getAccountByIdAndEmail, testRequest.body.userId, testRequest.body.oldEmail);
            sinon.assert.calledWith(stubbedService.updateEmail, testRequest.body.userId, testRequest.body.newEmail);
        });
        
        it("should respond 404 if getAccountByIdAndEmail resolves null", async () => {
            //Arrange
            stubbedService.getAccountByIdAndEmail.resolves(null);
            
            //Act
            await testController.updateEmail(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledWith(stubbedResponse.status, 404);
            sinon.assert.notCalled(stubbedService.updateEmail);
        });
    });
    
    describe("updatePassword", () => {
        beforeEach(() => {     
            stubbedService = {
                getAccountByEmail: sinon.stub(),
                updatePassword: sinon.stub(),
            };
            stubbedResponse = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };
            
            testController = new AccountController(stubbedService);
            testAccount = { _id: 1, username: "testUsername", email: "test@email.com", password: bcrypt.hashSync("testPass", Number(process.env.HASH_ROUNDS)) };
            testRequest = { body: { email: "test@email.com", oldPassword: "testPass", newPassword: "newPass"} };
            
            stubbedService.getAccountByEmail.resolves(testAccount);
            stubbedService.updatePassword.resolves({});
        });
        
        afterEach(() => {
            stubbedService = undefined;
            stubbedResponse = undefined;
            testController = undefined;
            testRequest = undefined;
            testAccount = undefined;
        });
        
        it("should respond 204 in normal circumstances", async () => {
            //Act
            await testController.updatePassword(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledWith(stubbedResponse.status, 204);
            sinon.assert.calledWith(stubbedService.getAccountByEmail, testRequest.body.email);
            sinon.assert.calledWith(stubbedService.updatePassword, testAccount._id, testRequest.body.newPassword);
        });
        
        it("should respond 404 if getAccountById resolves null", async () => {
            //Arrange
            stubbedService.getAccountByEmail.resolves(null);
            
            //Act
            await testController.updatePassword(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledWith(stubbedResponse.status, 404);
            sinon.assert.notCalled(stubbedService.updatePassword);
        });
        
        it("should respond 404 if password does not match", async () => {
            //Arrange
            testRequest.body.oldPassword = "wrongPass";
            
            //Act
            await testController.updatePassword(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledWith(stubbedResponse.status, 404);
            sinon.assert.notCalled(stubbedService.updatePassword);
        });
        
        it("should respond 500 if updatePassword resolves null", async () => {
            //Arrange
            stubbedService.updatePassword.resolves(null);
            
            //Act
            await testController.updatePassword(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledWith(stubbedResponse.status, 500);
        });
    });
});