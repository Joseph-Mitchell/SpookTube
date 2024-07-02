import * as bcrypt from "bcrypt"
import Account from "../models/Account.model.js";
import Role from "../models/Role.model.js";

export default class AccountService {
    async getAccountById(id) {
        return await Account.findById(id);
    }
    
    async getAccountByIdentifier(identifier) {
        return await Account.findOne({ $or: [{ email: identifier }, { username: identifier }]});
    }
    
    async createAccount(email, username, password) {
        return await Account.create({ username: username, email: email, password: bcrypt.hashSync(password, Number(process.env.HASH_ROUNDS)) });
    }
    
    async getRoleById(id) {
        return await Account.findById(id).select("role").populate("role");
    }
}