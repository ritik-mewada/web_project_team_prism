import connectToDatabase from "@/lib/db";
import { verifyToken } from "@/lib/jwt";
import { SavingGoal } from "@/model/SavingGoal";
import { Transaction } from "@/model/Transaction";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
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

        // Get all transactions
        const transactions = await Transaction.find({ userId });

        // Split into income and expenses
        let income = 0;
        let expenses = 0;
        const categories: { [key: string]: number } = {};
        const monthly: { [key: string]: number } = {};

        for (const txn of transactions) {
            const amount = txn.amount || 0;
            const isIncome = txn.category.toLowerCase() === "income";

            // Monthly key: "Jul" (short format)
            const month = new Date(txn.date).toLocaleString("default", {
                month: "short",
            });

            if (isIncome) {
                income += amount;
            } else {
                expenses += amount;

                // Category breakdown
                categories[txn.category] =
                    (categories[txn.category] || 0) + amount;

                // Monthly trends
                monthly[month] = (monthly[month] || 0) + amount;
            }
        }

        // Calculate savings progress
        const savingGoals = await SavingGoal.find({ userId });
        const saved = savingGoals.reduce((sum, goal) => sum + goal.saved, 0);

        return NextResponse.json({
            income,
            expenses,
            savings: saved,
            categories,
            monthly,
        });
    } catch (err: any) {
        return NextResponse.json(
            { message: err.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
