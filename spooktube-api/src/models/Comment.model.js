import { Schema, model } from "mongoose";

const commentSchema = new Schema({
    message: { type: String, required: true },
    videoId: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "Account" },
    timeCode: { type: Number, default: 0 },
});

const Comment = model("Comment", commentSchema);

export default Comment;