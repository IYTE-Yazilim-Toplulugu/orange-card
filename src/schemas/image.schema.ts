import mongoose, { Schema } from "mongoose";

const profileSchema = new Schema({
    user_id: {type: mongoose.Types.ObjectId, required: true},
    image: {type: String, required: true},

}, { timestamps: true });


// eslint-disable-next-line @typescript-eslint/no-explicit-any
let ProfilePictureModel = mongoose.Model<any>;
try {
    ProfilePictureModel = mongoose.model("pp");
} catch {
    ProfilePictureModel = mongoose.model("pp", profileSchema);
}

export default ProfilePictureModel;