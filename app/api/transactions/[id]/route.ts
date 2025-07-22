import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { Transaction } from "@/model/Transaction";

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectToDatabase();
        const token = (await cookies()).get("token")?.value;
        if (!token)
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );

        const user = await verifyToken(token);

        const { id } = await params;
        const result = await Transaction.findOneAndDelete({
            _id: id,
            userId: user.id,
        });

        if (!result) {
            return NextResponse.json(
                { message: "Not found or unauthorized" },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "Deleted" });
    } catch (error) {
        console.error("DELETE error: ", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectToDatabase();
        const token = (await cookies()).get("token")?.value;
        if (!token)
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );

        const user = await verifyToken(token);
        const body = await req.json();

        const { id } = await params;
        const result = await Transaction.findOneAndUpdate(
            { _id: id, userId: user.id },
            body,
            { new: true }
        );

        if (!result) {
            return NextResponse.json(
                { message: "Not found or unauthorized" },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "Updated", transaction: result });
    } catch (error) {
        console.error("PUT error:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectToDatabase();
        const token = (await cookies()).get("token")?.value;
        if (!token)
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );

        const user = await verifyToken(token);
        const { id } = await params;
        const transaction = await Transaction.findOne({
            _id: id,
            userId: user.id,
        });

        if (!transaction)
            return NextResponse.json({ message: "Not found" }, { status: 404 });

        return NextResponse.json({ transaction });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
