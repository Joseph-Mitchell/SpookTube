import Controller from "./Controller.js";

export default class VideoController extends Controller {
    async getAllVideos(req, res) {
        const videos = await this._service.getAllVideos();
        
        let response = []
        videos.forEach((video) => {
            let { uploadDate, ...rest } = video;
            response.push(rest);
        })
        
        res.status(200).json(response);
    }
}