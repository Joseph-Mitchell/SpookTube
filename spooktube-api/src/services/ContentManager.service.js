import cloudinary from "cloudinary";

export default class ContentManagerService {
    async createVideo(videoFile) {
        return await cloudinary.uploader.upload(videoFile, {
            resource_type: "video",
            use_filename: false,
            overwrite: false
        });
    }
    
    async deleteVideo(videoId) {
        return await cloudinary.uploader.destroy(videoId, { resource_type: "video" })
    }
}