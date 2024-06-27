import AccountMiddleware from "../middleware/Account.middleware.js";
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
        this._router.post("/post", AccountMiddleware.authenticateToken, (req, res) => {
            this._controller.makeComment(req, res);
        });
    }
}