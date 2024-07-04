import cloudinary from "cloudinary";
import { dataUriToBuffer } from "data-uri-to-buffer";

export default class ContentManagerService {
    async uploadVideo(videoFile) {
        return await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream((result, error) => {
                if (error) {
                    return reject(error);
                }
                return resolve(result);
            }, {
                resource_type: "video",
                use_filename: false,
                overwrite: false,
                folder: process.env.CLOUDINARY_FOLDER
            }).end(Buffer.from(dataUriToBuffer(videoFile).buffer));
        });
    }
    
    async deleteVideo(videoId) {
        let folder;
        if (process.env.CLOUDINARY_FOLDER)
            folder = process.env.CLOUDINARY_FOLDER + "/";
        else
            folder = "";
        
        return await cloudinary.v2.uploader.destroy(folder + videoId, {
            resource_type: "video",
        });
    }
}