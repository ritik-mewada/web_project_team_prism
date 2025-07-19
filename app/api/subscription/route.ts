import connectToDatabase from "@/lib/db";
import { verifyToken } from "@/lib/jwt";
import { Subscription } from "@/model/Subscription";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectToDatabase();
        const token = (await cookies()).get("token")?.value;
        const user = await verifyToken(token!);

        const subscriptions = await Subscription.find({ userId: user.id }).sort(
            { month: 1 }
        );

        return NextResponse.json({ subscriptions });
    } catch (err) {
        return NextResponse.json({ message: "server error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await connectToDatabase();

        const token = (await cookies()).get("token")?.value;
        const user = await verifyToken(token!);
        const { service, amount, frequency, status } = await req.json();

        if (!service || !amount || !frequency || !status) {
            return NextResponse.json(
                {
                    message: "missing fields",
                },
                {
                    status: 400,
                }
            );
        }

        const newSubscription = new Subscription({
            userId: user.id,
            service,
            amount,
            frequency,
            status,
        });
        await newSubscription.save();
        return NextResponse.json(
            { message: "Subscription added" },
            {
                status: 201,
            }
        );
    } catch (err) {
        return NextResponse.json({ message: "server error" }, { status: 500 });
    }
}
