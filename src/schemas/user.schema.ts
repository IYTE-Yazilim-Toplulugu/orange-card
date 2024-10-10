import mongoose, { Schema } from "mongoose";

export enum UserRole {
    MEMBER = "MEMBER",
    TEAM_MEMBER = "TEAM_MEMBER",
    TEAM_LEADER = "TEAM_LEADER",
    BOARD_MEMBER = "BOARD_MEMBER",
    BOARD_HEAD = "BOARD_HEAD"
}

const userSchema = new Schema({
    schoolNumber: {type: String, required: true},
    fullName: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: false},
    department: {type: String, required: true},
    
    token: {type: String, required: true},

    role: {type: String, required: true, default: UserRole.MEMBER},
    isSpecial: {type: Boolean, required: true, default: false},


}, { timestamps: true });


// eslint-disable-next-line @typescript-eslint/no-explicit-any
let UserModel = mongoose.Model<any>;
try {
    UserModel = mongoose.model("user");
} catch {
    UserModel = mongoose.model("user", userSchema);
}

export default UserModel;