import sinon from "sinon";
import CommentController from "../../src/controllers/Comment.controller.js";

describe("Comment Controller", () => {    
    describe("getVideoComments", () => {
        let stubbedService;
        let stubbedResponse;
        let testController;
        let testRequest;
        let testComments;
        let testResponseComments;
        
        beforeEach(() => {
            stubbedService = { getVideoComments: sinon.stub() };
            stubbedResponse = { status: sinon.stub().returnsThis(), json: sinon.stub() };
            
            testController = new CommentController(stubbedService);
            testRequest = { params: { videoId: 1 } };

            testComments = [];
            testResponseComments = [];
            for (let i = 0; i < 20; i++) {
                testComments.push({ _doc: { comment: "hi", videoId: i, userId: i, timeCode: i } });
                testResponseComments.push({ comment: "hi", videoId: i, userId: i, timeCode: i });
            }
            
            stubbedService.getVideoComments.resolves(testComments);
        });
        
        afterEach(() => {
            stubbedService = undefined;
            stubbedResponse = undefined;
            testController = undefined;
            testRequest = undefined;
            testComments = undefined;
            testResponseComments = undefined;
        });
        
        it("should respond with 200 in normal circumstances", async () => {
            //Act
            await testController.getVideoComments(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledWith(stubbedService.getVideoComments, testRequest.params.videoId);
            sinon.assert.calledWith(stubbedResponse.status, 200);
            sinon.assert.calledWith(stubbedResponse.json, { comments: testResponseComments });
        });
        
        it("should respond with 500 if service rejects", async () => {
            //Arrange
            stubbedService.getVideoComments.rejects(new Error())
            
            //Act
            await testController.getVideoComments(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledWith(stubbedResponse.status, 500);
        });
    });
    
    describe("getUserComments", () => {
        let stubbedService;
        let stubbedResponse;
        let testController;
        let testRequest;
        let testComments;
        let testResponseComments;
        
        beforeEach(() => {
            stubbedService = { getUserCommentsCount: sinon.stub(), getUserComments: sinon.stub() };
            stubbedResponse = { status: sinon.stub().returnsThis(), json: sinon.stub() };
            
            testController = new CommentController(stubbedService);
            testRequest = { params: { rangeMin: 0, rangeMax: 20 }, body: { userId: 1 } };

            testComments = [];
            testResponseComments = [];
            for (let i = 0; i < 20; i++) {
                testComments.push({ _doc: { comment: "hi", videoId: i, userId: i, timeCode: i } });
                testResponseComments.push({ comment: "hi", videoId: i, userId: i, timeCode: i });
            }
            
            stubbedService.getUserCommentsCount.resolves(20);
            stubbedService.getUserComments.resolves(testComments);
        });
        
        afterEach(() => {
            stubbedService = undefined;
            stubbedResponse = undefined;
            testController = undefined;
            testRequest = undefined;
            testComments = undefined;
            testResponseComments = undefined;
        });
        
        it("should call res.status with 200 in normal circumstances", async () => {
            //Act
            await testController.getUserComments(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledOnceWithExactly(stubbedResponse.status, 200);
            sinon.assert.calledWith(stubbedResponse.json, { comments: testResponseComments, pages: 1 });
        });
        
        it("should respond with expected array when req.params.rangeMax < comments in collection", async () => {
            //Arrange
            testRequest.params.rangeMax = 10;
            testResponseComments = testResponseComments.splice(0, 10);
            
            //Act
            await testController.getUserComments(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledOnceWithExactly(stubbedResponse.status, 200);
            sinon.assert.calledWith(stubbedResponse.json, { comments: testResponseComments, pages: 2 });
        });
           
        it("should respond with expected array when req.params.rangeMin > zero", async () => {
            //Arrange
            testRequest.params.rangeMin = 10;
            testResponseComments = testResponseComments.splice(10, 20);
            
            //Act
            await testController.getUserComments(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledOnceWithExactly(stubbedResponse.status, 200);
            sinon.assert.calledWith(stubbedResponse.json, { comments: testResponseComments, pages: 2 });
        });
        
        it("should respond with expected array when req.params.rangeMax > comments in collection", async () => {
            //Arrange
            testRequest.params.rangeMax = 25;
            
            //Act
            await testController.getUserComments(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledOnceWithExactly(stubbedResponse.status, 200);
            sinon.assert.calledWith(stubbedResponse.json, { comments: testResponseComments, pages: 1 });
        });
                     
        it("should respond with expected array when req.params.rangeMin < Zero", async () => {
            //Arrange
            testRequest.params.rangeMin = -5;
            
            //Act
            await testController.getUserComments(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledOnceWithExactly(stubbedResponse.status, 200);
            sinon.assert.calledWith(stubbedResponse.json, { comments: testResponseComments, pages: 1 });
        });
                         
        it("should respond with 500 if service rejects an error", async () => {
            //Arrange
            stubbedService.getUserComments.rejects(new Error());
            
            //Act
            await testController.getUserComments(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledOnceWithExactly(stubbedResponse.status, 500);
        });
    });
        
    describe("makeComment", () => {
        let stubbedCommentService;
        let stubbedAccountService;
        let stubbedResponse;
        let testController;
        let testAccount;
        let testComment;
        let testRequest;
        
        beforeEach(() => {
            stubbedCommentService = { createComment: sinon.stub() };
            stubbedAccountService = { getAccountById: sinon.stub() };
            stubbedResponse = { status: sinon.stub().returnsThis(), json: sinon.stub() };
            
            testController = new CommentController(stubbedCommentService, stubbedAccountService);
            
            testAccount = {};
            testComment = { comment: "hi", videoId: 1, userId: 1, timeCode: 5 };
            testRequest = { body: testComment };
            
            stubbedAccountService.getAccountById.resolves(testAccount);
            stubbedCommentService.createComment.resolves(testComment);
        });
        
        afterEach(() => {
            stubbedCommentService = undefined;
            stubbedAccountService = undefined;;
            stubbedResponse = undefined;;
            testController = undefined;;
            testAccount = undefined;;
            testComment = undefined;;
            testRequest = undefined;;
        });
        
        it("should respond with 201 in normal circumstances", async () => {
            //Act
            await testController.makeComment(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledWith(stubbedAccountService.getAccountById, testComment.userId);
            sinon.assert.calledWith(
                stubbedCommentService.createComment,
                testComment.comment,
                testComment.videoId,
                testComment.userId,
                testComment.timeCode);
            sinon.assert.calledWith(stubbedResponse.status, 201);
            sinon.assert.calledWith(stubbedResponse.json, { comment: testComment });
        });
        
        it("should respond with 401 if accountService.getAccountById resolves null", async () => {
            //Arrange
            stubbedAccountService.getAccountById.resolves(null);
            
            //Act
            await testController.makeComment(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledWith(stubbedResponse.status, 401);
        });
        
        it("should respond with 400 if commentService.createComment resolves null", async () => {
            //Arrange
            stubbedCommentService.createComment.resolves(null);
            
            //Act
            await testController.makeComment(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledWith(stubbedResponse.status, 400);
        });
        
        it("should respond with 500 if accountService.getAccountById rejects", async () => {
            //Arrange
            stubbedAccountService.getAccountById.rejects(new Error());
            
            //Act
            await testController.makeComment(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledWith(stubbedResponse.status, 500);
        });
        
        it("should respond with 500 if commentService.createComment rejects", async () => {
            //Arrange
            stubbedCommentService.createComment.rejects(new Error());
            
            //Act
            await testController.makeComment(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledWith(stubbedResponse.status, 500);
        });
    });
});