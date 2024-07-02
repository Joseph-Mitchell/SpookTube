import AccountMiddleware from "../middleware/Account.middleware.js";
import Router from "./Router.js";

export default class VideoRouter extends Router {
    
    constructor(controller) {
        super(controller);
        
        this._pathRoot = "/videos";
    }
    
    _initialiseRouter() {
        this._router.get("/all/:rangeMin/:rangeMax", (req, res) => {
            this._controller.getAllVideos(req, res);
        });
        this._router.get("/user/:rangeMin/:rangeMax", AccountMiddleware.authenticateToken, (req, res) => {
            this._controller.getUserVideos(req, res);
        });
        this._router.post("/post", AccountMiddleware.authenticateToken, (req, res) => {
            this._controller.uploadVideo(req, res);
        });
        this._router.delete("/delete", AccountMiddleware.authenticateToken, (req, res) => {
            this._controller.deleteVideo(req, res);
        }); 
    }
}