import basicService from "./basicService.js";

export default async function login(identifier, password) {
    const method = "post";
    const url = "/accounts/login";
    const data = {
        identifier: identifier,
        password: password,
    };
    
    return await basicService(method, url, data);
}