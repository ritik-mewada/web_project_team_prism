"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    User,
    Home,
    CreditCard,
    DollarSign,
    Target,
    UserCircle,
    FileText,
    Shield,
    TrendingUp,
    LogOut,
} from "lucide-react";
import Image from "next/image";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const isActive = (href: string) => pathname === href;

    const linkClass = (href: string) =>
        `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors
    ${
        isActive(href)
            ? "bg-emerald-200 text-emerald-900 font-semibold shadow-lg"
            : "text-slate-700 dark:text-slate-200 hover:bg-emerald-100 hover:text-emerald-900 dark:hover:bg-emerald-900 dark:hover:text-emerald-200"
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
        <div className="flex h-screen bg-gradient-to-br from-gray-50 to-blue-100 dark:from-black dark:to-gray-900">
            {/* Sidebar */}
            <aside className="flex flex-col justify-between min-h-screen p-6 space-y-8 shadow-2xl w-72 bg-gradient-to-br from-emerald-100 to-slate-200 dark:from-emerald-900 dark:to-slate-800">
                <div>
                    <div className="flex items-center gap-3 mb-8">
                        <Image
                            src="/Logo.png"
                            alt="Logo"
                            width={40}
                            height={40}
                        />
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                Finance Tracker
                            </h1>
                        </div>
                    </div>
                    <nav className="space-y-2 text-base">
                        <Link
                            href="/dashboard"
                            className={linkClass("/dashboard")}
                        >
                            <Home className="w-4 h-4" /> Dashboard
                        </Link>
                        <Link
                            href="/transaction"
                            className={linkClass("/transaction")}
                        >
                            <CreditCard className="w-4 h-4" /> Transactions
                        </Link>
                        <Link href="/budgets" className={linkClass("/budgets")}>
                            <DollarSign className="w-4 h-4" /> Budgets
                        </Link>
                        <Link
                            href="/saving-goal"
                            className={linkClass("/saving-goal")}
                        >
                            <Target className="w-4 h-4" /> Savings Goals
                        </Link>
                        <Link href="/account" className={linkClass("/account")}>
                            <User className="w-4 h-4" /> Account
                        </Link>
                        <Link href="/debts" className={linkClass("/debts")}>
                            <FileText className="w-4 h-4" /> Debts
                        </Link>
                        <Link
                            href="/subscriptions"
                            className={linkClass("/subscriptions")}
                        >
                            <Shield className="w-4 h-4" /> Subscriptions
                        </Link>
                        <Link
                            href="/missions"
                            className={linkClass("/missions")}
                        >
                            <TrendingUp className="w-4 h-4" /> Missions
                        </Link>
                    </nav>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3 py-2 text-base text-gray-600 transition-colors rounded-lg hover:bg-red-100 hover:text-red-700 dark:text-gray-400 dark:hover:bg-red-900"
                >
                    <LogOut className="w-4 h-4" /> Log out
                </button>
            </aside>

            {/* Main content */}
            <main className="flex-1 overflow-auto text-gray-900 bg-white shadow-lg dark:bg-black dark:text-white">
                {children}
            </main>
        </div>
    );
}
