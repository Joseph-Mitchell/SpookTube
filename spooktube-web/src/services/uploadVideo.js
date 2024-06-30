import basicService from "./basicService.js";

export default async function uploadVideo(videoFile, token) {
    const method = "post";
    const url = "/videos/post/";
    const body = {
        videoFile: videoFile
    }
    const headers = {
        authentication: token
    }

    return await basicService(method, url, body, headers);
}