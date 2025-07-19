import connectToDatabase from "@/lib/db";
import { verifyToken } from "@/lib/jwt";
import { Subscription } from "@/model/Subscription";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectToDatabase();
        const token = (await cookies()).get("token")?.value;
        const user = await verifyToken(token!);
        const subscription = await Subscription.findOne({
            _id: params.id,
            userId: user.id,
        });

        if (!subscription) {
            return NextResponse.json({ message: "Not found" }, { status: 404 });
        }
        return NextResponse.json({ subscription });
    } catch (err) {
        return NextResponse.json({ message: "server error" }, { status: 500 });
    }
}

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectToDatabase();
        const token = (await cookies()).get("token")?.value;

        const user = await verifyToken(token!);
        const data = await req.json();

        const updated = await Subscription.findByIdAndUpdate(
            { _id: params.id, userId: user.id },
            data,
            { new: true }
        );

        if (!updated) {
            return NextResponse.json({ message: "Not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Updated", subscription: updated });
    } catch (err) {}
    return NextResponse.json({ message: "server errro" }, { status: 500 });
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectToDatabase();
        const token = (await cookies()).get("token")?.value;
        const user = await verifyToken(token!);

        const deleted = await Subscription.findOneAndDelete({
            _id: params.id,
            userId: user.id,
        });
        if (!deleted)
            return NextResponse.json({ message: "Not found" }, { status: 404 });

        return NextResponse.json({ message: "Deleted" });
    } catch (err) {
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
