"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const isActive = (href: string) => pathname === href;

    const linkClass = (href: string) =>
        `block hover:underline text-sm ${
            isActive(href)
                ? "font-semibold text-blue-600 dark:text-blue-400"
                : "text-gray-800 dark:text-gray-300"
        }`;

    const handleLogout = async () => {
        try {
            await fetch("/api/auth/logout", { method: "POST" });
            router.push("/login");
        } catch (error) {
            console.log("Logout failed", error);
        }
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className="w-64 min-h-screen p-6 space-y-6 bg-white shadow-md dark:bg-gray-900">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Finance Tracker
                </h1>
                <nav className="space-y-4 text-sm">
                    <Link href="/dashboard" className={linkClass("/dashboard")}>
                        Dashboard
                    </Link>
                    <Link href="/transaction" className={linkClass("/transaction")}>
                        Transactions
                    </Link>
                    <Link href="/budgets" className={linkClass("/budgets")}>
                        Budgets
                    </Link>
                    <Link href="/saving-goal" className={linkClass("/saving-goal")}>
                        Savings Goals
                    </Link>
                    <Link href="/account" className={linkClass("/account")}>
                        Account
                    </Link>

                    {/* ✅ Remaining Feature Links */}
                    <Link href="/debts" className={linkClass("/debts")}>
                        Debts
                    </Link>
                    <Link href="/subscriptions" className={linkClass("/subscriptions")}>
                        Subscriptions
                    </Link>
                    <Link href="/missions" className={linkClass("/missions")}>
                        Missions
                    </Link>
                </nav>

                <button
                    onClick={handleLogout}
                    className="text-sm text-gray-600 hover:underline dark:text-gray-400"
                >
                    Log out
                </button>
            </aside>

            {/* Main content */}
            <main className="flex-1 p-6 text-gray-900 bg-gray-50 dark:bg-black dark:text-white">
                {children}
            </main>
        </div>
    );
}
