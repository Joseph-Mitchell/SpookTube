import basicService from "./basicService.js";

export default async function deleteVideo(videoId, token) {
    const method = "delete";
    const url = "/videos/delete/";
    const body = {
        videoId: videoId
    }
    const headers = {
        authentication: token
    }

    return await basicService(method, url, body, headers);
}