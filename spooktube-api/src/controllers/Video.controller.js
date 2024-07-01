export default class VideoController {
    
    #videoService;
    #contentManagerService
    
    constructor(videoService, contentManagerService) {
        this.#videoService = videoService;
        this.#contentManagerService = contentManagerService;
    }
    
    async getAllVideos(req, res) {
        try {
            const count = await this.#videoService.getVideosCount();
            
            const videosPerPage = (req.params.rangeMax - req.params.rangeMin);
            const pages = Math.floor(count / videosPerPage) + 1;
            
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
    
    async getUserVideos(req, res) {
        try {           
            const count = await this.#videoService.getVideosCount();
            
            const videosPerPage = (req.params.rangeMax - req.params.rangeMin);
            const pages = Math.floor(count / videosPerPage) + 1;
            
            const videos = await this.#videoService.getUserVideos(req.body.userId);

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
    
    async uploadVideo(req, res) {
        try {
            const result = await this.#contentManagerService.uploadVideo(req.body.videoFile);

            if (!result.public_id) {
                return res.status(500).json({ message: "Content Manager not available" });
            }

            const newVideo = await this.#videoService.createVideo(result.public_id, req.body.userId);
            
            if (newVideo === null) {
                await this.#contentManagerService.deleteVideo(result.public_id);
                return res.status(500).json({ message: "Server Error" });
            }
            
            return res.status(201).json({ videoId: result.public_id });
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    }
    
    async deleteVideo(req, res) {
        try {
            
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    }
}