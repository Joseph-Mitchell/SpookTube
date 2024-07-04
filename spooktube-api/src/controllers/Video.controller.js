export default class VideoController {
    
    #videoService;
    #contentManagerService
    #accountService;
    
    constructor(videoService, contentManagerService, accountService) {
        this.#videoService = videoService;
        this.#contentManagerService = contentManagerService;
        this.#accountService = accountService;
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
            console.log(e.message)
            return res.status(500).json({ message: e.message });
        }
    }
    
    async getUserVideos(req, res) {
        try {           
            const count = await this.#videoService.getUserVideosCount(req.body.userId);
            
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
            console.log(e.message)
            return res.status(500).json({ message: e.message });
        }
    }
    
    async uploadVideo(req, res) {
        try {
            const result = await this.#contentManagerService.uploadVideo(req.body.videoFile);

            if (!result.public_id) {
                throw new Error("Video could not be created due to a content manager error");
            }

            const newVideo = await this.#videoService.createVideo(result.public_id, req.body.userId);
            
            if (newVideo === null) {
                await this.#contentManagerService.deleteVideo(result.public_id);
                throw new Error("Video could not be created due to a server error");
            }
            
            return res.status(201).json({ videoId: result.public_id });
        } catch (e) {
            console.log(e.message)
            return res.status(500).json({ message: e.message });
        }
    }
    
    async deleteVideo(req, res) {
        try {
            let role = (await this.#accountService.getRoleById(req.body.userId)).role.roleName;

            let video;
            if (role === "moderator") {
                video = await this.#videoService.getVideo(req.body.videoId);
            } else {
                video = await this.#videoService.checkOwnership(req.body.videoId, req.body.userId);
                
                if (video === null) {
                    return res.status(404).json({ message: "Video by this user not found" });
                }
            }
            await this.#videoService.deleteVideo(req.body.videoId);
            
            const deletion = await this.#contentManagerService.deleteVideo(req.body.videoId);
            
            if (deletion.result !== "ok") {
                await this.#videoService.createVideo(video.videoId, video.userId, video.uploadDate);
                throw new Error("Video could not be deleted due to a content manager error: " + deletion.result)
            }

            return res.status(204).json();
        } catch (e) {
            console.log(e.message)
            return res.status(500).json({ message: e.message });
        }
    }
}