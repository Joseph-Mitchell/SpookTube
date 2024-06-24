import { Schema, model } from "mongoose";

const videoSchema = new Schema({
    videoId: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "Account", required: true },
    uploadDate: { type: Date, default: Date.now },
});

const Video = model("Account", videoSchema);

export default Video;