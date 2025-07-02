"use server";

import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    try {
        await verifyToken(token!);
        redirect("/dashboard");
    } catch {
        redirect("/login");
    }
}
