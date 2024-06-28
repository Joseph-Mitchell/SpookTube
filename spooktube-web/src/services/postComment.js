import basicService from "./basicService.js";

export default async function postComment(comment, videoId, timeCode, token) {
    const method = "post";
    const url = "/comments/post/";
    const body = {
        comment: comment,
        videoId: videoId,
        timeCode: timeCode,
    }
    const headers = {
        authentication: token
    }

    return await basicService(method, url, body, headers);
}