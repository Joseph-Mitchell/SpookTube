import basicService from "./basicService.js";

export default async function register(email, username, password) {
    const method = "post";
    const url = "/accounts/register";
    const data = {
        email: email,
        username: username,
        password: password,
    };
    
    return await basicService(method, url, data);
}