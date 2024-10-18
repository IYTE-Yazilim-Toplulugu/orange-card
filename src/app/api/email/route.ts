import ConnectDB from "@/config/db";
import { sendChangePassEmail } from "@/functions/sendEmail";
import UserModel from "@/schemas/user.schema";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const data = await req.json();
        await ConnectDB();

        const user = await UserModel.findOne({ email: data.email });

        if (user) {
            const res = await sendChangePassEmail({ receiver: user.email, token: user.token });
            if (res) {
                return NextResponse.json({message: "Mail Sent", user: user}, { status: 200 });
            }
            else {
                return NextResponse.json({message: "User Found but mail couldn't send", user: user}, { status: 400 });
            }
        }
        return NextResponse.json({message: "User Cannot Found"}, { status: 404 });
    } catch {
        return NextResponse.json({message: "Internal Server Error"}, { status: 500 });
    }
}