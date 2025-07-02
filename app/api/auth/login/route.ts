import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { generateToken } from "@/lib/jwt";
import connectToDatabase from "@/lib/db";
import { User } from "@/model/User";

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();

        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { message: "Email and password are required" },
                { status: 400 }
            );
        }

        const user = await User.findOne({ email }).select("+password");
        console.log("USER", user);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }

        const token = await generateToken({
            id: user._id.toString(),
            username: user.username,
            email: user.email,
            role: user.role,
        });

        const response = NextResponse.json({ message: "Login successful" });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60,
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("Login Error:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

// export async function POST(req: NextRequest) {
//     await connectToDatabase();

//     const { email, password } = await req.json();

//     if (!email || !password) {
//         return NextResponse.json(
//             { message: "Email and password are required" },
//             { status: 400 }
//         );
//     }

//     const user = await User.findOne({ email });
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//         return NextResponse.json(
//             { message: "Invalid credentials" },
//             { status: 401 }
//         );
//     }

//     const token = await generateToken({
//         id: user._id.toString(),
//         username: user.username,
//         email: user.email,
//         role: user.role,
//     });

//     const response = NextResponse.json({ message: "Login successfull" });

//     response.cookies.set("token", token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         maxAge: 7 * 24 * 60 * 60,
//         path: "/",
//     });

//     return response;
// }
