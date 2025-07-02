import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/jwt";

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const pathname = request.nextUrl.pathname;

    const isProtectedRoute = pathname.startsWith("/dashboard");
    const isAuthPage = pathname === "/login" || pathname === "/register";

    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (isAuthPage && token) {
        try {
            await verifyToken(token);
            return NextResponse.redirect(new URL("/dashboard", request.url));
        } catch (error) {
            console.warn("Invalid token in middleware:", error);
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard", "/login", "/register"],
};
