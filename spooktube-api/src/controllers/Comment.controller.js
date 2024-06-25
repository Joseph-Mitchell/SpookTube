import Controller from "./Controller.js";

export default class CommentController extends Controller { 
    async getVideoComments(req, res) {
        const comments = await this._service.getVideoComments(req.params.videoId);

        const mapped = comments.map((comment) => {
            return comment._doc;
        })
        
        res.status(200).json(mapped);
    }
}