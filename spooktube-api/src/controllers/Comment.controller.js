import Controller from "./Controller.js";

export default class CommentController extends Controller { 
    #accountService
    
    constructor(commentService, accountService) {
        super(commentService);
        
        this.#accountService = accountService;
    }
    
    async getVideoComments(req, res) {
        try {
            const comments = await this._service.getVideoComments(req.params.videoId);

            const mapped = comments.map((comment) => {
                return comment._doc;
            })
            
            return res.status(200).json({ comments: mapped });
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    }
    
    async makeComment(req, res) {
        try {
            const account = await this.#accountService.getAccountById(req.body.userId);
            
            if (account === null) {
                return res.status(401).json({ message: "No matching account found" });
            }
            
            const newComment = await this._service.createComment(
                req.body.comment,
                req.body.videoId,
                req.body.userId,
                req.body.timeCode
            );
            
            if (newComment === null) {
                return res.status(400).json({ message: "Given comment could not be created" });
            }
            
            return res.status(201).json({ comment: newComment });
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    }
}
