import Account from "../models/Account.model.js";
import Controller from "./Controller.js";
import jwt from "jsonwebtoken";

export default class AccountController extends Controller { 
    async registerAccount(req, res) {
        const existingEmailAccount = await this._service.getAccountByEmail(req.body.email);
        
        if (existingEmailAccount !== null)
            res.status(409).json({ message: "An account with this email already exists" });
        
        const existingUsernameAccount = await this._service.getAccountByUsername(req.body.username);
 
        if (existingUsernameAccount !== null)
            res.status(409).json({ message: "An account with this username already exists" });
        
        const newAccount = await this._service.createAccount(req.body.email, req.body.username, req.body.password)
        const signedToken = jwt.sign({ id: newAccount._id.toString() }, process.env.SECRET, { expiresIn: "1 week" });
        
        res.status(201).json({ token: signedToken });
    }
}