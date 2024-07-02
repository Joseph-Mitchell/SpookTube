import Comment from "../models/Comment.model.js";
import Account from "../models/Account.model.js";

export default class CommentService {
    async getVideoComments(videoId) {
        return await Comment.find({ videoId: videoId }).sort({ timeCode: 1 }).select("-_id comment videoId userId timeCode").populate("userId", "-_id username icon");
    }
    
    async getUserComments(userId) {
        return await Comment.find({ userId: userId }).select("-_id comment videoId userId timeCode").populate("userId", "-_id username icon");
    }
    
    async createComment(comment, videoId, userId, timeCode) {
        return (await Comment.create({comment: comment, videoId: videoId, userId: userId, timeCode: timeCode})).populate("userId", "-_id username icon");
    }
}