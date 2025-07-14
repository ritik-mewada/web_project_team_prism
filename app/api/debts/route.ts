import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import connectToDatabase from "@/lib/db";
import { Debt } from "@/model/Debt";


export async function GET() {
    try {
        await connectToDatabase();
        const cookieStore = cookies();
        const token = (await cookieStore).get("token")?.value;
        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const decoded = await verifyToken(token);
        if (!decoded) {
            return NextResponse.json({ message: "Invalid token" }, { status: 401 });
        }
        const userId = decoded.id;
        if (!userId) {
            return NextResponse.json({ message: "User ID not found" }, { status: 401 });
        }
        const debts = await Debt.find({ userId }).sort({ createdAt: -1 });
        if (!debts || debts.length === 0) {
            return NextResponse.json({ message: "No debts found" }, { status: 404 });
        }
        return NextResponse.json(debts);
    } catch (error) {
        console.error("GET ERROR: ", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const cookieStore = cookies();
        const token = (await cookieStore).get("token")?.value;
        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const decoded = await verifyToken(token);
        if (!decoded) {
            return NextResponse.json({ message: "Invalid token" }, { status: 401 });
        }
        const userId = decoded.id;
        const body = await req.json();
        if (!body.type || !body.amount || !body.dueDate) {
            return NextResponse.json(
                { message: "Missing fields" },
                { status: 400 }
            );
        }
        const newDebt = new Debt({
            userId,
            type: body.type,
            amount: parseFloat(body.amount),
            dueDate: body.dueDate,
        });
        await newDebt.save();
        return NextResponse.json(
            { message: "Debt added successfully", debt: newDebt },
            { status: 201 }
        );
    } catch (err: any) {
        return NextResponse.json(
            { message: err.message || "Server error" },
            { status: 500 }
        );
    }
}