import basicService from "./basicService.js";

export default async function updatePassword(email, oldPassword, newPassword) {
    const method = "put";
    const url = "/accounts/password/";
    const body = {
        email: email,
        oldPassword: oldPassword,
        newPassword: newPassword
    }

    return await basicService(method, url, body, {});
}