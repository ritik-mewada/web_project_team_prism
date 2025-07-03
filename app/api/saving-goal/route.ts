import connectToDatabase from "@/lib/db";
import { verifyToken } from "@/lib/jwt";
import { SavingGoal } from "@/model/SavingGoal";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        await connectToDatabase();

        const cookieStore = cookies();
        const token = (await cookieStore).get("token")?.value;

        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }
        const decoded = await verifyToken(token);
        const userId = decoded.id;
        console.log("USERID", userId);
        const body = await req.json();
        const { name, target, saved } = body;

        if (!name || !target || !saved) {
            return NextResponse.json(
                { message: "Missing fields" },
                { status: 400 }
            );
        }

        const newTransaction = new SavingGoal({
            userId,
            name,
            target,
            saved,
        });
        console.log("new saving goal", newTransaction);
        await newTransaction.save();

        return NextResponse.json(
            { message: "SavingGoal added" },
            { status: 201 }
        );
    } catch (error) {
        console.error("POST ERROR: ", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}

export async function GET() {
    await connectToDatabase();
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;

    if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const decoded = await verifyToken(token);
    const userId = decoded.id;
    console.log("GET USERID", userId);
    const goals = await SavingGoal.find({ userId }).sort({
        createdAt: -1,
    });
    return NextResponse.json({ goals });
}
