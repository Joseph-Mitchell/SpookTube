import Video from "../models/Video.model.js";
import Service from "./Service.js";

export default class VideoService extends Service {
    async getAllVideos() {
        return await Video.find({}).sort({ uploadDate: -1 });
    }
}