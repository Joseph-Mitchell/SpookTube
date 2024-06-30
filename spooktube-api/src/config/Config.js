import { config } from 'dotenv';
import cloudinary from "cloudinary";

export default class Config {
    
    static #nodeEnv = process.env.NODE_ENV;
    
    static load() {
        config({
            path: `src/config/.env${Config.#nodeEnv !== `prod` ? `.${Config.#nodeEnv}` : ``}`
        });
        
        cloudinary.config({
            secure: true,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_SECRET,
            cloud_name: process.env.CLOUDINARY_NAME
        });
    }
}
