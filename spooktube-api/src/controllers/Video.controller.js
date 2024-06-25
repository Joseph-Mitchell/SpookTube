import Controller from "./Controller.js";

export default class VideoController extends Controller {
    async getAllVideos(req, res) {
        try {
            const videos = await this._service.getAllVideos();

            let response = []
            for (let i = Math.max(req.params.rangeMin, 0); (i < videos.length) && (i < req.params.rangeMax); i++) {
                let { uploadDate, ...rest } = videos[i]._doc;
                response.push(rest);
            }
            res.status(200).json(response);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    }
}