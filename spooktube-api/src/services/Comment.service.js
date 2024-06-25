import Comment from "../models/Comment.model.js";
import Service from "./Service.js";

export default class CommentService extends Service {
    async getVideoComments(videoId) {
        return await Comment.find({ videoId: videoId });
    }
}