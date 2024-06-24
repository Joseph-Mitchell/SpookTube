import { Router } from "express";

export default class Router {
    #router;
    #pathRoot = "/";
    _controller;
    
    getRouter() {
        return this.#router;
    }
    
    getPathRoot() {
        return this.#pathRoot;
    }
    
    constructor(controller) {
        this.#router = Router();             
        this._controller = controller;
        
        this._initialiseRouter();
    }
    
    _initialiseRouter() {}
}
