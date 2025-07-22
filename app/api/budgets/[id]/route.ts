import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import connectToDatabase from "@/lib/db";
import { Budget } from "@/model/Budget";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectToDatabase();
        const token = (await cookies()).get("token")?.value;
        const user = await verifyToken(token!);
        const budget = await Budget.findOne({
            _id: params.id,
            userId: user.id,
        });

        if (!budget)
            return NextResponse.json({ message: "Not found" }, { status: 404 });
        return NextResponse.json({ budget });
    } catch (err) {
        return NextResponse.json({ message: "Server error" }, { status: 500 });
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

        const updated = await Budget.findOneAndUpdate(
            { _id: params.id, userId: user.id },
            data,
            { new: true }
        );

        if (!updated)
            return NextResponse.json({ message: "Not found" }, { status: 404 });
        return NextResponse.json({ message: "Updated", budget: updated });
    } catch (err) {
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectToDatabase();
        const token = (await cookies()).get("token")?.value;
        const user = await verifyToken(token!);

        const deleted = await Budget.findOneAndDelete({
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
