import basicService from "./basicService.js";

export default async function getAllVideos(min, max) {
    const method = "get";
    const url = "/videos/all/" + min + "/" + max;
    
    return await basicService(method, url);
}