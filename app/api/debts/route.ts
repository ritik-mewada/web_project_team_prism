import { NextRequest, NextResponse } from "next/server";

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
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const decoded = await verifyToken(token);
        const userId = decoded.id;

        const debts = await Debt.find({ userId }).sort({ dueDate: 1 });

        return NextResponse.json({ debts });
    } catch (err) {
        console.error("Debt fetch error:", err);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();
        const token = (await cookies()).get("token")?.value;
        const user = await verifyToken(token!);

        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { type, amount, dueDate } = await req.json();

        if (!type || !amount || !dueDate) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }

        const newDebt = new Debt({
            userId: user.id,
            type,
            amount,
            dueDate: new Date(dueDate),
        });
        console.log(newDebt);
        await newDebt.save();

        return NextResponse.json(
            { message: "Debt added successfully", debt: newDebt },
            { status: 201 }
        );
    } catch (err) {
        console.error("[DEBT_POST_ERROR]", err);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
