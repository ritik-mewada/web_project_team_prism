import connectToDatabase from "@/lib/db";
import { User } from "@/model/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
    await connectToDatabase();
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
        return NextResponse.json(
            { message: "All fields are required" },
            { status: 400 }
        );
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
        return NextResponse.json(
            { message: "Username or email already is use" },
            { status: 400 }
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        role: "User",
    });

    return NextResponse.json(
        {
            message: "User registerd successfully",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
            },
        },
        { status: 201 }
    );
}
