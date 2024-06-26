import * as bcrypt from "bcrypt"
import Account from "../models/Account.model.js";
import Service from "./Service.js";

export default class AccountService extends Service {
    async getAccountByUsernameOrEmail(email, username) {
        return await Account.findOne({ $or: [{ email: email }, { username: username }] });
    }
    
    async createAccount(username, email, password) {
        return await Account.create({ username: username, email: email, password: bcrypt.hashSync(password, process.env.HASH_ROUNDS) });
    }
}