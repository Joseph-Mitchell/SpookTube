export default class VideoController {
    
    #videoService;
    
    constructor(videoService) {
        this.#videoService = videoService;
    }
    
    async getAllVideos(req, res) {
        try {
            const VIDEOS_PER_PAGE = 18;
            
            const count = await this.#videoService.getVideosCount();
            const pages = Math.floor(count / VIDEOS_PER_PAGE) + 1;
            
            const videos = await this.#videoService.getAllVideos();

            let response = []
            for (let i = Math.max(req.params.rangeMin, 0); (i < videos.length) && (i < req.params.rangeMax); i++) {
                let { uploadDate, ...rest } = videos[i]._doc;
                response.push(rest);
            }

            return res.status(200).json({ videos: response, pages: pages });
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    }
}