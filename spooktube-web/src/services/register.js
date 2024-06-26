import axios from "axios";

export default async function register(email, username, password) {    
    try {
        const apiUrl = import.meta.env.VITE_APP_BACKEND_URL;
        
        const response = await axios({
            method: "post",
            url: apiUrl + "/accounts/register",
            data: {
                email: email,
                username: username,
                password: password,
            },
        });

        return response.data;
    } catch (e) {
        if (e.response.data) {
            if (e.response.data.errors)
                return { message: e.response.data.errors[0].msg };
            else
                return { message: e.response.data.message };
        }
        else
            return { message: "Sorry, something went wrong, please try again later." };
    }
}