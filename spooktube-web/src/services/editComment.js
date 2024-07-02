import basicService from "./basicService.js";

export default async function editComment(id, newComment, token) {
    const method = "put";
    const url = "/comments";
    const body = {
        id: id,
        newComment: newComment
    }
    const headers = {
        authentication: token
    }

    return await basicService(method, url, body, headers);
}