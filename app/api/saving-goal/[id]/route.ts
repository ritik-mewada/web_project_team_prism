import connectToDatabase from "@/lib/db";
import { verifyToken } from "@/lib/jwt";
import { SavingGoal } from "@/model/SavingGoal";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectToDatabase();
        const token = (await cookies()).get("token")?.value;
        if (!token)
            return NextResponse.json(
                {
                    message: "Unauthorized",
                },
                { status: 401 }
            );
        const user = await verifyToken(token);
        const body = await req.json();

        const { id } = await params;
        const result = await SavingGoal.findOneAndUpdate(
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
        return NextResponse.json({ message: "Updated", goal: result });
    } catch (err) {
        return NextResponse.json(
            { message: (err as Error).message },
            { status: 500 }
        );
    }
}

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
        const result = await SavingGoal.findOneAndDelete({
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
    } catch (err) {
        return NextResponse.json(
            { message: (err as Error).message },
            { status: 500 }
        );
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
        const savingGoal = await SavingGoal.findOne({
            _id: id,
            userId: user.id,
        });

        if (!savingGoal) {
            return NextResponse.json({ message: "Not found" }, { status: 404 });
        }

        return NextResponse.json({ savingGoal });
    } catch (err) {
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
