import AccountMiddleware from "../middleware/Account.middleware.js";
import CommentMiddleware from "../middleware/Comment.middleware.js";
import Router from "./Router.js";

export default class CommentRouter extends Router {
    
    constructor(controller) {
        super(controller);
        
        this._pathRoot = "/comments";
    }
    
    _initialiseRouter() {
        this._router.get("/video/:videoId", (req, res) => {
            this._controller.getVideoComments(req, res);
        });
        this._router.get("/user/:rangeMin/:rangeMax", AccountMiddleware.authenticateToken, (req, res) => {
            this._controller.getUserComments(req, res);
        });
        this._router.post(
            "/post",
            AccountMiddleware.authenticateToken,
            CommentMiddleware.validateCommentDetails(),
            (req, res) => {
                this._controller.makeComment(req, res);
            }
        );
        this._router.put(
            "/",
            AccountMiddleware.authenticateToken,
            CommentMiddleware.validateEditComment(),
            (req, res) => {
                this._controller.editComment(req, res);
            }
        );
        this._router.delete(
            "/",
            AccountMiddleware.authenticateToken,
            (req, res) => {
                this._controller.deleteComment(req, res);
            }
        );
    }
}