import cloudinary from "cloudinary";

export default class ContentManagerService {
    async createVideo(videoFile) {
        return await cloudinary.uploader.upload(videoFile, {
            resource_type: "video",
            use_filename: false,
            unique_filename: true,
            overwrite: false
        });
    }
}