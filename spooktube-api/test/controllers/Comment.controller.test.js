import sinon from "sinon";
import CommentController from "../../src/controllers/Comment.controller.js";

describe("Controller", () => {
    let stubbedService;
    let stubbedResponse;
    let testController;
    let testRequest;
    let testComments;
    let testResponseComments;
    
    describe("getVideoComments", () => {
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
});