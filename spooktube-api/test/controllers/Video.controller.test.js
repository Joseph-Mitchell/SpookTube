import sinon from "sinon";
import VideoController from "../../src/controllers/Video.controller.js";

describe("Controller", () => {    
    describe("getAllVideos", () => {
        let stubbedService;
        let stubbedResponse;
        let testController;
        let testRequest;
        let testDate;
        let testVideos;
        let testResponseVideos;
        
        beforeEach(() => {
            stubbedService = { getAllVideos: sinon.stub(), getVideosCount: sinon.stub() };
            stubbedResponse = { status: sinon.stub().returnsThis(), json: sinon.stub() };
            
            testController = new VideoController(stubbedService);
            testRequest = { params: { rangeMin: 0, rangeMax: 20 } };
            
            testDate = Date.now();
            
            testVideos = [];
            testResponseVideos = [];
            for (let i = 0; i < 20; i++) {
                testVideos.push({ _doc: { videoId: i, userId: i, uploadDate: testDate }});
                testResponseVideos.push({ videoId: i, userId: i });
            }
            
            stubbedService.getAllVideos.resolves(testVideos);
            stubbedService.getVideosCount.resolves(10);
        });
        
        afterEach(() => {
            stubbedService = undefined;
            stubbedResponse = undefined;
            testController = undefined;
            testRequest = undefined;
            testDate = undefined;
            testVideos = undefined;
            testResponseVideos = undefined;
        });
        
        it("should call res.status with 200 in normal circumstances", async () => {
            //Act
            await testController.getAllVideos(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledOnceWithExactly(stubbedResponse.status, 200);
            sinon.assert.calledWith(stubbedResponse.json, { videos: testResponseVideos, pages: 1 });
        });
        
        it("should respond with expected array when req.params.rangeMax < videos in collection", async () => {
            //Arrange
            testRequest.params.rangeMax = 10;
            testResponseVideos = testResponseVideos.splice(0, 10);
            
            //Act
            await testController.getAllVideos(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledOnceWithExactly(stubbedResponse.status, 200);
            sinon.assert.calledWith(stubbedResponse.json, { videos: testResponseVideos, pages: 2 });
        });
        
        it("should respond with expected array when req.params.rangeMin > zero", async () => {
            //Arrange
            testRequest.params.rangeMin = 10;
            testResponseVideos = testResponseVideos.splice(10, 20);
            
            //Act
            await testController.getAllVideos(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledOnceWithExactly(stubbedResponse.status, 200);
            sinon.assert.calledWith(stubbedResponse.json, { videos: testResponseVideos, pages: 2 });
        });
        
        it("should respond with expected array when req.params.rangeMax > videos in collection", async () => {
            //Arrange
            testRequest.params.rangeMax = 25;
            
            //Act
            await testController.getAllVideos(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledOnceWithExactly(stubbedResponse.status, 200);
            sinon.assert.calledWith(stubbedResponse.json, { videos: testResponseVideos, pages: 1 });
        });
            
        it("should respond with expected array when req.params.rangeMin < Zero", async () => {
            //Arrange
            testRequest.params.rangeMin = -5;
            
            //Act
            await testController.getAllVideos(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledOnceWithExactly(stubbedResponse.status, 200);
            sinon.assert.calledWith(stubbedResponse.json, { videos: testResponseVideos, pages: 1 });
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
    
    describe("getUserVideos", () => {
        let stubbedService;
        let stubbedResponse;
        let testController;
        let testRequest;
        let testDate;
        let testVideos;
        let testResponseVideos;
        
        beforeEach(() => {
            stubbedService = { getUserVideos: sinon.stub(), getVideosCount: sinon.stub() };
            stubbedResponse = { status: sinon.stub().returnsThis(), json: sinon.stub() };
            
            testController = new VideoController(stubbedService);
            testRequest = { params: { rangeMin: 0, rangeMax: 20 }, body: { userId: 1 } };
            
            testDate = Date.now();
            
            testVideos = [];
            testResponseVideos = [];
            for (let i = 0; i < 20; i++) {
                testVideos.push({ _doc: { videoId: i, userId: i, uploadDate: testDate } });
                testResponseVideos.push({ videoId: i, userId: i });
            }
            
            stubbedService.getUserVideos.resolves(testVideos);
            stubbedService.getVideosCount.resolves(10);
        });
        
        afterEach(() => {
            stubbedService = undefined;
            stubbedResponse = undefined;
            testController = undefined;
            testRequest = undefined;
            testDate = undefined;
            testVideos = undefined;
            testResponseVideos = undefined;
        });
        
        it("should call res.status with 200 in normal circumstances", async () => {
            //Act
            await testController.getUserVideos(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledOnceWithExactly(stubbedResponse.status, 200);
            sinon.assert.calledWith(stubbedResponse.json, { videos: testResponseVideos, pages: 1 });
        });
        
        it("should respond with expected array when req.params.rangeMax < videos in collection", async () => {
            //Arrange
            testRequest.params.rangeMax = 10;
            testResponseVideos = testResponseVideos.splice(0, 10);
            
            //Act
            await testController.getUserVideos(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledOnceWithExactly(stubbedResponse.status, 200);
            sinon.assert.calledWith(stubbedResponse.json, { videos: testResponseVideos, pages: 2 });
        });
           
        it("should respond with expected array when req.params.rangeMin > zero", async () => {
            //Arrange
            testRequest.params.rangeMin = 10;
            testResponseVideos = testResponseVideos.splice(10, 20);
            
            //Act
            await testController.getUserVideos(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledOnceWithExactly(stubbedResponse.status, 200);
            sinon.assert.calledWith(stubbedResponse.json, { videos: testResponseVideos, pages: 2 });
        });
        
        it("should respond with expected array when req.params.rangeMax > videos in collection", async () => {
            //Arrange
            testRequest.params.rangeMax = 25;
            
            //Act
            await testController.getUserVideos(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledOnceWithExactly(stubbedResponse.status, 200);
            sinon.assert.calledWith(stubbedResponse.json, { videos: testResponseVideos, pages: 1 });
        });
                     
        it("should respond with expected array when req.params.rangeMin < Zero", async () => {
            //Arrange
            testRequest.params.rangeMin = -5;
            
            //Act
            await testController.getUserVideos(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledOnceWithExactly(stubbedResponse.status, 200);
            sinon.assert.calledWith(stubbedResponse.json, { videos: testResponseVideos, pages: 1 });
        });
                         
        it("should respond with 500 if service rejects an error", async () => {
            //Arrange
            stubbedService.getUserVideos.rejects(new Error());
            
            //Act
            await testController.getUserVideos(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledOnceWithExactly(stubbedResponse.status, 500);
        });
    });
    
    describe("uploadVideo", () => {
        let stubbedContentManagerService;
        let stubbedVideoService;
        let stubbedResponse;
        let testRequest;
        let testController;
        let testDate;
        let testUploadResult;
        let testNewVideo;
        
        beforeEach(() => {
            stubbedContentManagerService = { uploadVideo: sinon.stub(), deleteVideo: sinon.stub() };
            stubbedVideoService = { createVideo: sinon.stub() };
            stubbedResponse = { status: sinon.stub().returnsThis(), json: sinon.stub() };
            
            testController = new VideoController(stubbedVideoService, stubbedContentManagerService);
            testRequest = { body: { userId: 1, videoFile: "hbfdigsnijk" } };        
            testDate = Date.now();
            testUploadResult = { public_id: "gfrd" };
            testNewVideo = {};
            
            stubbedContentManagerService.uploadVideo.resolves(testUploadResult);
            stubbedVideoService.createVideo.resolves(testNewVideo);
        });
        
        afterEach(() => {
            stubbedContentManagerService = undefined;
            stubbedVideoService = undefined;
            stubbedResponse = undefined;
            testRequest = undefined;
            testController = undefined;
            testDate = undefined;
            testUploadResult = undefined;
            testNewVideo = undefined;
        });
        
        it("should call res.status with 201 in normal circumstances", async () => {
            //Act
            await testController.uploadVideo(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledWith(stubbedContentManagerService.uploadVideo, testRequest.body.videoFile);
            sinon.assert.calledWith(stubbedVideoService.createVideo, testUploadResult.public_id);
            sinon.assert.calledOnceWithExactly(stubbedResponse.status, 201);
        });
        
        it("should call res.status with 500 if service.uploadVideo resolves without public_id field", async () => {
            //Arrange
            testUploadResult.public_id = undefined;
            
            //Act
            await testController.uploadVideo(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledOnceWithExactly(stubbedResponse.status, 500);
        });
        
        it("should call res.status with 500 if service.createVideo resolves null", async () => {
            //Arrange
            stubbedVideoService.createVideo.resolves(null);
            
            //Act
            await testController.uploadVideo(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledWith(stubbedContentManagerService.deleteVideo, testUploadResult.public_id);
            sinon.assert.calledOnceWithExactly(stubbedResponse.status, 500);
        });
        
        it("should call res.status with 500 if service.createVideo rejects", async () => {
            //Arrange
            stubbedVideoService.createVideo.rejects(new Error());
            
            //Act
            await testController.uploadVideo(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledOnceWithExactly(stubbedResponse.status, 500);
        });
        
        it("should call res.status with 500 if service.uploadVideo rejects", async () => {
            //Arrange
            stubbedContentManagerService.uploadVideo.rejects(new Error());
            
            //Act
            await testController.uploadVideo(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledOnceWithExactly(stubbedResponse.status, 500);
        });
    });
    
    describe("uploadVideo", () => {
        let stubbedContentManagerService;
        let stubbedVideoService;
        let stubbedResponse;
        let testRequest;
        let testController;
        
        beforeEach(() => {
            stubbedContentManagerService = { deleteVideo: sinon.stub() };
            stubbedVideoService = { checkOwnership: sinon.stub(), deleteVideo: sinon.stub(), createVideo: sinon.stub() };
            stubbedResponse = { status: sinon.stub().returnsThis(), json: sinon.stub() };
            
            testController = new VideoController(stubbedVideoService, stubbedContentManagerService);
            testRequest = { body: { userId: 1, videoId: "gfrd" } };
            
            stubbedContentManagerService.deleteVideo.resolves({ result: "ok" });
            stubbedVideoService.checkOwnership.resolves({});
            stubbedVideoService.deleteVideo.resolves({});
            stubbedVideoService.createVideo.resolves({});
        });
        
        afterEach(() => {
            stubbedContentManagerService = undefined;
            stubbedVideoService = undefined;
            stubbedResponse = undefined;
            testRequest = undefined;
            testController = undefined;
        });
        
        it("should call res.status with 204 in normal circumstances", async () => {
            //Act
            await testController.deleteVideo(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledOnceWithExactly(stubbedResponse.status, 204);
            sinon.assert.calledWith(stubbedVideoService.checkOwnership, testRequest.body.videoId, testRequest.body.userId);
            sinon.assert.calledWith(stubbedVideoService.deleteVideo, testRequest.body.videoId);
            sinon.assert.calledWith(stubbedContentManagerService.deleteVideo, testRequest.body.videoId);
            sinon.assert.notCalled(stubbedVideoService.createVideo);
        });
        
        it("should call res.status with 401 if checkOwnership resolves null", async () => {
            //Arrange
            stubbedVideoService.checkOwnership.resolves(null);
            
            //Act
            await testController.deleteVideo(testRequest, stubbedResponse);
            
            //Assert
            sinon.assert.calledOnceWithExactly(stubbedResponse.status, 401);
            sinon.assert.notCalled(stubbedVideoService.deleteVideo);
            sinon.assert.notCalled(stubbedContentManagerService.deleteVideo);
        });
    });
});