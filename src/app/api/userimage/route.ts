import ConnectDB from "@/config/db";
import ProfilePictureModel from "@/schemas/image.schema";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const data = await req.json();
        await ConnectDB();

        const pp = await ProfilePictureModel.findOne({ user_id: data.user_id });

        if (pp) {
            await ProfilePictureModel.updateOne({ user_id: data.user_id }, { image: data.image });
            return NextResponse.json({ message: "Image Successfuly Changed" }, { status: 201 });
        }
        else {
            await ProfilePictureModel.create(data);
            return NextResponse.json({ message: "Image Successfuly Created" }, { status: 200 });
        }
    } catch {
        return NextResponse.json({ message: "Image Cannot Be Created" }, { status: 400 });
    }
}