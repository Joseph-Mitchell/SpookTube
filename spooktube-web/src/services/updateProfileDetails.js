import basicService from "./basicService.js";

export default async function updateProfileDetails(token, username, icon) {
    const method = "put";
    const url = "/accounts/profile/";
    const body = {
        username: username,
        icon: icon,
    }
    const headers = {
        authentication: token
    }

    return await basicService(method, url, body, headers);
}