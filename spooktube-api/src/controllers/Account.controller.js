import Controller from "./Controller.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default class AccountController extends Controller { 
    async registerAccount(req, res) {
        try {
            const existingEmailAccount = await this._service.getAccountByEmail(req.body.email);
            
            if (existingEmailAccount !== null)
                return res.status(409).json({ message: "An account with this email already exists" });
            
            const existingUsernameAccount = await this._service.getAccountByUsername(req.body.username);
    
            if (existingUsernameAccount !== null)
                return res.status(409).json({ message: "An account with this username already exists" });
            
            const newAccount = await this._service.createAccount(req.body.email, req.body.username, req.body.password)
            const signedToken = jwt.sign({ id: newAccount._id.toString() }, process.env.SECRET, { expiresIn: "1 week" });
            
            return res.status(201).json({ token: signedToken });
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    }
    
    async loginAccount(req, res) {
        try {
            const account = await this._service.getAccountByIdentifier(req.body.identifier);
                    
            if (account === null || !bcrypt.compareSync(req.body.password, account.password))
                return res.status(404).json({ message: "username or password incorrect" });
            
            const signedToken = jwt.sign({ id: account._id.toString() }, process.env.SECRET, { expiresIn: "1 week" });
            res.status(200).json({ token: signedToken });
        } catch (e) {     
            res.status(500).json({ message: e.message });
        }
    }
}