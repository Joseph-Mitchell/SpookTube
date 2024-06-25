import Comment from "../models/Comment.model.js";
import Account from "../models/Account.model.js";
import Service from "./Service.js";

export default class CommentService extends Service {
    async getVideoComments(videoId) {
        return await Comment.find({ videoId: videoId }).select("-_id comment videoId userId timeCode").populate("userId", "-_id username icon");
    }
}