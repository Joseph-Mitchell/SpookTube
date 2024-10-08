import Video from "../models/Video.model.js";

export default class VideoService {
    async getUserVideosCount(userId) {
        return await Video.find({ userId: userId }).estimatedDocumentCount();
    }
    
    async getVideosCount() {
        return await Video.find({}).estimatedDocumentCount();
    } 

    async getAllVideos() {
        return await Video.find({}).sort({ uploadDate: -1 });
    }
    
    async getUserVideos(userId) {
        return await Video.find({ userId: userId }).sort({ uploadDate: -1 });
    }
    
    async createVideo(videoId, userId, uploadDate = Date.now()) {
        return await Video.create({ videoId: videoId, userId: userId, uploadDate: uploadDate });
    }
    
    async deleteVideo(videoId) {
        return await Video.deleteOne({ videoId: videoId });
    }
    
    async checkOwnership(videoId, userId) {
        return await Video.findOne({ videoId: videoId, userId: userId });
    }
    
    async getVideo(videoId) {
        return await Video.findOne({ videoId: videoId });
    }
}
