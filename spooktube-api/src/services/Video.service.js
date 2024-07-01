import Video from "../models/Video.model.js";

export default class VideoService {
    async getVideosCount() {
        return await Video.find({}).estimatedDocumentCount();
    } 

    async getAllVideos() {
        return await Video.find({}).sort({ uploadDate: -1 });
    }
    
    async getUserVideos(userId) {
        return await Video.find({ userId: userId }).sort({ uploadDate: -1 });
    }
    
    async createVideo(videoId, userId) {
        return await Video.create({ videoId: videoId, userId: userId });
    }
}