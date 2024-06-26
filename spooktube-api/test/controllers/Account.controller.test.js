import sinon from "sinon";
import { assert } from "chai";
import jwt from "jsonwebtoken";
import AccountController from "../../src/controllers/Account.controller.js";

describe("Account Controller", () => {
    let stubbedService;
    let stubbedResponse;
    let testController;
    let testRequest;
    let testAccount;
    
    describe("registerAccount", () => {
        beforeEach(() => {
            process.env.SECRET = 
            
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
    });
});