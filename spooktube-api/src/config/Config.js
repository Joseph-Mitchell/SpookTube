import { config } from 'dotenv';
import cloudinary from "cloudinary";

export default class Config {
    
    static #nodeEnv = process.env.NODE_ENV;
    static #cloudinaryOptions = {
        use_filename: false,
        unique_filename: true,
        overwrite: false
    }
    
    static getCloudinaryOptions() {
        return Config.#cloudinaryOptions;
    }
    
    static load() {
        config({
            path: `src/config/.env${Config.#nodeEnv !== `prod` ? `.${Config.#nodeEnv}` : ``}`
        });
        
        cloudinary.config({
            secure: true
        });
    }
}
