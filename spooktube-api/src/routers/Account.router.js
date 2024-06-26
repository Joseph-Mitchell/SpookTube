import AccountMiddleware from "../middleware/Account.middleware.js";
import Router from "./Router.js";

export default class AccountRouter extends Router {
    
    constructor(controller) {
        super(controller);
        
        this._pathRoot = "/accounts";
    }
    
    _initialiseRouter() {
        this._router.post("/register", AccountMiddleware.validateRegDetails(), (req, res) => {
            this._controller.registerAccount(req, res);
        });
    }
}