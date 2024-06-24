import { Schema, model } from "mongoose";

const accountSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: Schema.Types.ObjectId, ref: "Role" },
});

const Account = model("Account", accountSchema);

export default Account;