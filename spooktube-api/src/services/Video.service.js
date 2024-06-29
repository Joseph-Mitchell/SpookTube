import Video from "../models/Video.model.js";

export default class VideoService {
    async getAllVideos() {
        return await Video.find({}).sort({ uploadDate: -1 });
    }
    
    async getVideosCount() {
        return await Video.find({}).estimatedDocumentCount();
    }
    
    async createVideo(videoId, userId) {
        return await Video.create({ videoId: videoId, userId: userId });
    }
}