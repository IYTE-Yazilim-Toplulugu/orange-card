import ConnectDB from "@/config/db";
import UserModel from "@/schemas/user.schema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req: NextRequest, res: NextResponse) => {
    try {
        const data = await req.json();

        await ConnectDB();
        const user = await UserModel.findOne({ email: data.email });

        if (user) {
            if (await bcrypt.compare(data.password, user.password)) {
                if (user.isSpecial) {
                    return NextResponse.json({ message: "login successful", user: user }, { status: 200 });
                }
                else {
                    return NextResponse.json({ message: "Member is not an orange member", user: user }, { status: 201 });
                }
            }
        }
        return NextResponse.json({ message: "Member cannot found", user: user }, { status: 404 });

    } catch {
        return NextResponse.json({ message: "Error occured" }, { status: 500 });
    }
}