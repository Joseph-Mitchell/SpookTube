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
    }
}