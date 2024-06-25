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
    }
}