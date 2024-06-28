import basicService from "./basicService.js";

export default async function loginWithToken(token) {
    const method = "post";
    const url = "/accounts/token-login";
    const headers = {
        authentication: token
    };
    
    return await basicService(method, url, {}, headers);
}