import connectToDatabase from "@/lib/db";
import { verifyToken } from "@/lib/jwt";
import { Debt } from "@/model/Debt";
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

        const debt = await Debt.findOne({
            _id: params.id,
            userId: user.id,
        });
        console.log(debt);
        if (!debt) {
            return NextResponse.json({ message: "Not found" }, { status: 404 });
        }
        return NextResponse.json({ debt });
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

        const updated = await Debt.findByIdAndUpdate(
            { _id: params.id, userId: user.id },
            data,
            { new: true }
        );

        if (!updated) {
            return NextResponse.json({ message: "Not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Updated", debt: updated });
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

        const deleted = await Debt.findByIdAndDelete({
            _id: params.id,
            userId: user.id,
        });

        if (!deleted) {
            return NextResponse.json({ message: "not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Deleted" });
    } catch (err) {
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
