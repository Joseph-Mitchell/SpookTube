import { Schema, model } from "mongoose";

const accountSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    icon: { type: String, default: "0" },
    role: { type: Schema.Types.ObjectId, ref: "Role", default: "667b3dadb87fa4a52fbf8d0d" },
});

const Account = model("Account", accountSchema);

export default Account;