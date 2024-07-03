import basicService from "./basicService.js";

export default async function getAllComments(token, searchTerm, min, max) {
    if (searchTerm === "")
        searchTerm = " ";
    
    const method = "get";
    const url = "/comments/all/" + searchTerm + "/" + min + "/" + max;
    const body = {};
    const headers = {
        authentication: token
    }
    
    return await basicService(method, url, body, headers);
}