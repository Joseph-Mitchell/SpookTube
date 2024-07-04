import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default class AccountController { 
    
    #accountService
    
    constructor(accountService) {
        this.#accountService = accountService;
    }
    
    async registerAccount(req, res) {
        try {
            const existingEmailAccount = await this.#accountService.getAccountByIdentifier(req.body.email);
            
            if (existingEmailAccount !== null)
                return res.status(409).json({ message: "An account with this email already exists" });
            
            const existingUsernameAccount = await this.#accountService.getAccountByIdentifier(req.body.username);
    
            if (existingUsernameAccount !== null)
                return res.status(409).json({ message: "An account with this username already exists" });
            
            const newAccount = await this.#accountService.createAccount(req.body.email, req.body.username, req.body.password);
            const role = (await this.#accountService.getRoleById(newAccount._id)).role.roleName;
            const signedToken = jwt.sign({ id: newAccount._id.toString() }, process.env.SECRET, { expiresIn: "1 week" });
            return res.status(201).json({ token: signedToken, username: newAccount.username, icon: newAccount.icon, role: role });
        } catch (e) {
            console.log(e.message)
            return res.status(500).json({ message: e.message });
        }
    }
    
    async loginAccount(req, res) {
        try {
            const account = await this.#accountService.getAccountByIdentifier(req.body.identifier);
                    
            if (account === null || !bcrypt.compareSync(req.body.password, account.password))
                return res.status(404).json({ message: "username or password incorrect" });
            
            const signedToken = jwt.sign({ id: account._id.toString() }, process.env.SECRET, { expiresIn: "1 week" });
            return res.status(200).json({ token: signedToken, username: account.username, icon: account.icon, role: account.role.roleName });
        } catch (e) {     
            console.log(e.message)
            return res.status(500).json({ message: e.message });
        }
    }
    
    async loginWithToken(req, res) {
        try {
            const account = await this.#accountService.getAccountById(req.body.userId);
                    
            if (account === null)
                return res.status(404).json({ message: "No account with this id" });
            
            return res.status(200).json({ username: account.username, icon: account.icon, role: account.role.roleName });
        } catch (e) {      
            console.log(e.message)
            return res.status(500).json({ message: e.message });
        }
    }
    
    async updateProfileDetails(req, res) {
        try {
            const account = await this.#accountService.getAccountById(req.body.userId);
                    
            if (account === null)
                return res.status(404).json({ message: "No account with this id" });
            
            this.#accountService.updateProfileDetails(req.body.userId, req.body.username, req.body.icon);
            
            return res.status(204).json();
        } catch (e) {      
            console.log(e.message)
            return res.status(500).json({ message: e.message });
        }
    }
    
    async updateEmail(req, res) {
        try {
            const account = await this.#accountService.getAccountByIdAndEmail(req.body.userId, req.body.oldEmail);
                    
            if (account === null)
                return res.status(404).json({ message: "Current email is not correct" });

            await this.#accountService.updateEmail(req.body.userId, req.body.newEmail);
            
            return res.status(204).json();
        } catch (e) {
            console.log(e.message)
            return res.status(500).json({ message: e.message });
        }
    }
    
    async updatePassword(req, res) {
        try {
            const account = await this.#accountService.getAccountByEmail(req.body.email);
            
            if (account === null || !bcrypt.compareSync(req.body.oldPassword, account.password))
                return res.status(404).json({ message: "Email or password incorrect" });
            
            const result = await this.#accountService.updatePassword(account._id, req.body.newPassword);
            
            if (result === null)
                throw new Error("Password could not be updated due to a server error");
            
            return res.status(204).json();
        } catch (e) {
            console.log(e.message)
            return res.status(500).json({ message: e.message });
        }
    }
}