import basicService from "./basicService.js";

export default async function getVideoComments(videoId) {
    const method = "get";
    const url = "/comments/video/" + videoId;
    
    return await basicService(method, url);
}