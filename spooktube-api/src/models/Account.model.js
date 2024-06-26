import { Schema, model } from "mongoose";

const accountSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    icon: { type: String, default: "0" },
    role: { type: Schema.Types.ObjectId, ref: "Role", default: "667b4c31215f0508c26f0df8" },
});

const Account = model("Account", accountSchema);

export default Account;