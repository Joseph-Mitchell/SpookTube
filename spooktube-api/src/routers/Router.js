import { Router } from "express";

export default class Router {
    _router;
    _pathRoot = "/";
    _controller;
    
    getRouter() {
        return this._router;
    }
    
    getPathRoot() {
        return this._pathRoot;
    }
    
    constructor(controller) {
        this._router = Router();             
        this._controller = controller;
        
        this._initialiseRouter();
    }
    
    _initialiseRouter() {}
}
