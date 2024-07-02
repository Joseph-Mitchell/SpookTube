import basicService from "./basicService.js";

export default async function getUserComments(token, min, max) {
    const method = "get";
    const url = "/comments/user/" + min + "/" + max;
    const body = {};
    const headers = {
        authentication: token
    }
    
    return await basicService(method, url, body, headers);
}