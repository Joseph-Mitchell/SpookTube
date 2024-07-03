import express from "express";
import cors from "cors";

export default class Server {
    #app;
    #host;
    #port;
    #routers;
    #server;
    
    getApp () {
        return this.#app;
    }
    
    constructor(port, host, routers) {
        this.#app = express();
        this.#port = port;
        this.#host = host;
        this.#server = null;
        this.#routers = routers;
    }
    
    start() {
        this.#server = this.#app.listen(this.#port, this.#host, () => {
            console.log(`Server is listening on http://${this.#host}:${this.#port}`);
        });
        
        this.#app.use(cors({ origin: process.env.CLIENT_URL }));
        this.#app.use(express.json({ limit: "10mb" }))
        
        this.#routers.forEach(router => {
            this.#app.use(router.getPathRoot(), router.getRouter());
        });
    }
    
    close() {
        this.#server?.close();
    }
}
