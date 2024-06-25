import axios from "axios";

export default async function addFavourite(min, max) {    
    try {
        const apiUrl = import.meta.env.VITE_APP_BACKEND_URL;
        const response = await axios({
            method: "get",
            url: apiUrl + "/videos/all/" + min + "/" + max,
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