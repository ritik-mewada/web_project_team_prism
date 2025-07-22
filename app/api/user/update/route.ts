import connectToDatabase from "@/lib/db";
import { verifyToken } from "@/lib/jwt";
import { User } from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    await connectToDatabase();
    const token = req.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const decoded = await verifyToken(token);
        const { username } = await req.json();

        if (!username || typeof username !== "string") {
            return NextResponse.json(
                { message: "Invalid username" },
                { status: 400 }
            );
        }

        const updatedUser = await User.findByIdAndUpdate(
            decoded.id,
            { username },
            { new: true }
        ).select("username email");

        return NextResponse.json({
            message: "Username updated",
            user: updatedUser,
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
}
