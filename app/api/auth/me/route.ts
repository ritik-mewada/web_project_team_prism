import connectToDatabase from "@/lib/db";
import { verifyToken } from "@/lib/jwt";
import { User } from "@/model/User";
import { NextResponse } from "next/server";

export async function GET(req: NextResponse) {
    await connectToDatabase();
    const token = req.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const decoded = await verifyToken(token);
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }
        return NextResponse.json({ user });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
}
