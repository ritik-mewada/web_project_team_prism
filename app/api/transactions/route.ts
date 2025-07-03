import connectToDatabase from "@/lib/db";
import { verifyToken } from "@/lib/jwt";
import { Transaction } from "@/model/Transaction";
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

        const body = await req.json();
        const { date, description, category, amount } = body;

        if (!date || !description || !category || !amount) {
            return NextResponse.json(
                { message: "Missing fields" },
                { status: 400 }
            );
        }

        const newTransaction = new Transaction({
            userId,
            date: new Date(date),
            description,
            category,
            amount: parseFloat(amount),
        });
        console.log("new transaction", newTransaction);
        await newTransaction.save();

        return NextResponse.json(
            { message: "Transaction added" },
            { status: 201 }
        );
    } catch (error) {
        console.error("POST ERROR: ", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}

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

        const transactions = await Transaction.find({ userId }).sort({
            date: -1,
        });

        return NextResponse.json({ transactions }, { status: 200 });
    } catch (error) {
        console.error("GET ERROR: ", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
