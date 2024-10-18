import ConnectDB from "@/config/db";
import UserModel from "@/schemas/user.schema";
import { NextRequest, NextResponse } from "next/server";

import bcrypt from "bcrypt";

export const POST = async (req: NextRequest) => {
    try {
        const data = await req.json();
        await ConnectDB();

        if (data.password.length < 6) {
            return NextResponse.json({message: "Your password cannot be less than 6 characters long"}, {status: 400});
        } 

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        const userUpdate = UserModel.updateOne({ token: data.token }, { $set: { password: hashedPassword } });
        
        if ((await userUpdate).modifiedCount == 1) {
            return NextResponse.json({ message: "User Password Updated"}, { status: 200 });
        }
        else {
            return NextResponse.json({ message: "User Password Cannot Updated"}, { status: 400 });
        }
    } catch {
        return NextResponse.json({ message: "Internal Server Error"}, { status: 500 });
    }
}