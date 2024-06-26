import * as bcrypt from "bcrypt"
import Account from "../models/Account.model.js";
import Service from "./Service.js";

export default class AccountService extends Service {
    async getAccountByIdentifier(identifier) {
        return await Account.findOne({ $or: [{ email: identifier }, { username: identifier }] });
    }
    
    async getAccountByEmail(email) {
                return await Account.findOne({ email: email });
    }
    
    async getAccountByUsername(username) {
                return await Account.findOne({ username: username });
    }
    
    async createAccount(email, username, password) {
        return await Account.create({ username: username, email: email, password: bcrypt.hashSync(password, Number(process.env.HASH_ROUNDS)) });
    }
}