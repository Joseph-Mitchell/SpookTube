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
        this._router.post("/login", (req, res) => {
            this._controller.loginAccount(req, res);
        });
        this._router.post("/token-login", AccountMiddleware.authenticateToken, (req, res) => {
            this._controller.loginWithToken(req, res);
        });
        this._router.put("/profile", [AccountMiddleware.authenticateToken, AccountMiddleware.validateProfileDetails()], (req, res) => {
            this._controller.updateProfileDetails(req, res);
        });
        this._router.put("/email", [AccountMiddleware.authenticateToken, AccountMiddleware.validateNewEmail()], (req, res) => {
            this._controller.updateEmail(req, res);
        });
        this._router.put("/password", [AccountMiddleware.authenticateToken, AccountMiddleware.validateNewPassword()], (req, res) => {
            this._controller.updatePassword(req, res);
        });
    }
}