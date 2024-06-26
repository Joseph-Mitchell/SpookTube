import * as bcrypt from "bcrypt"
import Account from "../models/Account.model.js";
import Service from "./Service.js";

export default class AccountService extends Service {
    async getAccountByUsernameOrEmail(email, username) {
        return await Account.findOne({ $or: [{ email: email }, { username: username }] });
    }
}