import { Types } from "mongoose";

import Comment from "../models/Comment.model.js";
import Account from "../models/Account.model.js";

export default class CommentService {
    async getUserCommentsCount(userId) {
        return await Comment.find({ userId: userId }).estimatedDocumentCount();
    }
    
    async getVideoComments(videoId) {
        return await Comment.find({ videoId: videoId }).sort({ timeCode: 1 }).select("comment videoId userId timeCode").populate("userId", "-_id username icon");
    }
    
    async getUserComments(userId) {
        return await Comment.find({ userId: userId }).select("comment videoId userId timeCode").populate("userId", "-_id username icon");
    }
    
    async createComment(comment, videoId, userId, timeCode) {
        return (await Comment.create({comment: comment, videoId: videoId, userId: userId, timeCode: timeCode})).populate("userId", "-_id username icon");
    }
    
    async editComment(id, newComment) {
        return await Comment.findByIdAndUpdate(id, { comment: newComment });
    }
    
    async checkOwnership(id, userId) {
        return await Comment.findOne({ _id: new Types.ObjectId(id), userId: userId });
    }
    
    async deleteComment(id) {
        return await Comment.findByIdAndDelete(id);
    }
    
    async getCommentsCount(searchTerm) {
        return await Comment.find({ comment: { $regex: searchTerm, $options: "i" } }).estimatedDocumentCount();
    }
    
    async getAllComments(searchTerm) {
        return await Comment.find({ comment: { $regex: searchTerm, $options: "i" } });
    }
}