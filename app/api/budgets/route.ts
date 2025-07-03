import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import connectToDatabase from "@/lib/db";
import { Budget } from "@/model/Budget";

export async function GET() {
    try {
        await connectToDatabase();
        const token = (await cookies()).get("token")?.value;
        const user = await verifyToken(token!);
        const budgets = await Budget.find({ userId: user.id }).sort({
            month: 1,
        });

        return NextResponse.json({ budgets });
    } catch (err) {
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const token = (await cookies()).get("token")?.value;
        const user = await verifyToken(token!);
        const { category, amount, month } = await req.json();

        if (!category || !amount || !month) {
            return NextResponse.json(
                { message: "Missing fields" },
                { status: 400 }
            );
        }

        const newBudget = new Budget({
            userId: user.id,
            category,
            amount: parseFloat(amount),
            month,
        });

        await newBudget.save();
        return NextResponse.json({ message: "Budget added" }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
