import ConnectDB from "@/config/db";
import ProfilePictureModel from "@/schemas/image.schema";
import UserModel from "@/schemas/user.schema";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request : NextRequest) => {
    try {
        const { token } = await request.json();
        
        await ConnectDB();
        const user = await UserModel.findOne({ token: token });
        
        if(user) {
            const image = await ProfilePictureModel.findOne({ user_id: user._id });
            return NextResponse.json({ message: "Member Found", user: user, image: image }, { status: 200 });
        }
        else {
            return NextResponse.json({ message: "Member Cannot Found" }, { status: 404 });    
        }
    } catch {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}