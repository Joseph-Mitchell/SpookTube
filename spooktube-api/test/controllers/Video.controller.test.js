import sinon from "sinon";
import VideoController from "../../src/controllers/Video.controller.js";

describe("Controller", () => {
    let stubbedService;
    let stubbedResponse;
    let testController;
    let testRequest;
    let testDate;
    let testVideos;
    let testResponseVideos;
    
    describe("getAllVideos", () => {
        beforeEach(() => {
            stubbedService = { getAllVideos: sinon.stub() };
            stubbedResponse = { status: sinon.stub().returnsThis(), json: sinon.stub() };
            
            testController = new VideoController(stubbedService);
            testRequest = { params: { rangeMin: 0, rangeMax: 20 } };
            
            testDate = Date.now();
            
            testVideos = [];
            testResponseVideos = [];
            for (let i = 0; i < 20; i++) {
                testVideos.push({ videoId: i, userId: i, uploadDate: testDate, thumbnailTime: 0 });
                testResponseVideos.push({ videoId: i, userId: i, thumbnailTime: 0 });
            }
            
            stubbedService.getAllVideos.resolves(testVideos);
        });
        
        afterEach(() => {
            stubbedService = undefined;
            stubbedService = undefined;
            stubbedResponse = undefined;
            stubbedResponse = undefined;
            testController = undefined;
            testDate = undefined;
            testVideos = undefined;
        });
        
        it("should call res.status with 200 in normal circumstances", async () => {
            //Act
            await testController.getAllVideos(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledOnceWithExactly(stubbedResponse.status, 200);
            sinon.assert.calledWith(stubbedResponse.json, testResponseVideos);
        });
        
        it("should respond with expected array when req.params.rangeMax < videos in collection", async () => {
            //Arrange
            testRequest.params.rangeMax = 15;
            testResponseVideos = testResponseVideos.splice(0, 15);
            
            //Act
            await testController.getAllVideos(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledOnceWithExactly(stubbedResponse.status, 200);
            sinon.assert.calledWith(stubbedResponse.json, testResponseVideos);
        });
        
        it("should respond with expected array when req.params.rangeMin > zero", async () => {
            //Arrange
            testRequest.params.rangeMin = 5;
            testResponseVideos = testResponseVideos.splice(5, 20);
            
            //Act
            await testController.getAllVideos(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledOnceWithExactly(stubbedResponse.status, 200);
            sinon.assert.calledWith(stubbedResponse.json, testResponseVideos);
        });
        
        it("should respond with expected array when req.params.rangeMax > videos in collection", async () => {
            //Arrange
            testRequest.params.rangeMax = 25;
            
            //Act
            await testController.getAllVideos(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledOnceWithExactly(stubbedResponse.status, 200);
            sinon.assert.calledWith(stubbedResponse.json, testResponseVideos);
        });
            
        it("should respond with expected array when req.params.rangeMin < Zero", async () => {
            //Arrange
            testRequest.params.rangeMin = -5;
            
            //Act
            await testController.getAllVideos(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledOnceWithExactly(stubbedResponse.status, 200);
            sinon.assert.calledWith(stubbedResponse.json, testResponseVideos);
        });
                 
        it("should respond with 500 if service rejects an error", async () => {
            //Arrange
            stubbedService.getAllVideos.rejects(new Error());
            
            //Act
            await testController.getAllVideos(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledOnceWithExactly(stubbedResponse.status, 500);
        });
    });
});