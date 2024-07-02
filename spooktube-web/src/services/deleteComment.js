import basicService from "./basicService.js";

export default async function deleteComment(id, token) {
    const method = "delete";
    const url = "/comments";
    const body = {
        id: id,
    }
    const headers = {
        authentication: token
    }

    return await basicService(method, url, body, headers);
}