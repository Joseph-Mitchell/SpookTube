import basicService from "./basicService.js";

export default async function updateProfileDetails(token, username, iconText, iconColour) {
    const method = "put";
    const url = "/accounts/profile/";
    const body = {
        username: username,
        iconText: iconText,
        iconColour: iconColour,
    }
    const headers = {
        authentication: token
    }

    return await basicService(method, url, body, headers);
}