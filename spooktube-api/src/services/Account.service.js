import * as bcrypt from "bcrypt"
import Account from "../models/Account.model.js";
import Role from "../models/Role.model.js";

export default class AccountService {
    async getAccountById(id) {
        return await Account.findById(id).populate("role");
    }
    
    async getAccountByIdentifier(identifier) {
        return await Account.findOne({ $or: [{ email: identifier }, { username: identifier }]}).populate("role");
    }
    
    async createAccount(email, username, password) {
        return await Account.create({ username: username, email: email, password: bcrypt.hashSync(password, Number(process.env.HASH_ROUNDS)) });
    }
    
    async getRoleById(id) {
        return await Account.findById(id).select("role").populate("role");
    }
    
    async updateProfileDetails(id, username, icon) {
        return await Account.findByIdAndUpdate(id, { username: username, icon: icon });
    }
    
    async updateEmail(id, email) {
        return await Account.findByIdAndUpdate(id, { email: email });
    }
    
    async updatePassword(id, password) {
        return await Account.findByIdAndUpdate(id, { password: bcrypt.hashSync(password, Number(process.env.HASH_ROUNDS)) });
    }
    
    async getAccountByIdAndEmail(id, email) {
        return await Comment.findOne({ _id: new Types.ObjectId(id), email: email });
    }
}