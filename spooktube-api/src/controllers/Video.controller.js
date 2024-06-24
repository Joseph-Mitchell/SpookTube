import Controller from "./Controller.js";

export default class VideoController extends Controller {
    async getAllVideos(req, res) {
        const videos = await this._service.getAllVideos();
        
        let response = []
        for (let i = req.params.rangeMin; (i < videos.length) && (i < req.params.rangeMax); i++) {
            let { uploadDate, ...rest } = videos[i];
            response.push(rest);
        }
        
        res.status(200).json(response);
    }
}