import basicService from "./basicService.js";

export default async function updateEmail(token, oldEmail, newEmail) {
    const method = "put";
    const url = "/accounts/email/";
    const body = {
        oldEmail: oldEmail,
        newEmail: newEmail,
    }
    const headers = {
        authentication: token
    }

    return await basicService(method, url, body, headers);
}