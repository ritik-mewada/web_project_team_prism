"use client";
import React, { useEffect, useState } from "react";

// Data interfaces
interface Goal {
    _id: string;
    name: string;
    target: number;
    saved: number;
}
interface Budget {
    _id: string;
    category: string;
    amount: number;
    month: string;
}
interface Subscription {
    _id: string;
    service: string;
    amount: number;
    frequency: string;
    status: string;
}
interface Debt {
    _id: string;
    type?: string;
    name: string;
    amount: number;
    dueDate: string;
}

export default function MissionsPage() {
    const [goals, setGoals] = useState<Goal[]>([]);
    const [budgets, setBudgets] = useState<Budget[]>([]);
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [debts, setDebts] = useState<Debt[]>([]);

    useEffect(() => {
        async function fetchGoals() {
            try {
                const res = await fetch("/api/saving-goal");
                const data = await res.json();
                if (res.ok) setGoals(data.goals);
            } catch {
                setGoals([]);
            }
        }
        async function fetchBudgets() {
            try {
                const res = await fetch("/api/budgets");
                const data = await res.json();
                if (res.ok) setBudgets(data.budgets);
            } catch {
                setBudgets([]);
            }
        }
        async function fetchSubscriptions() {
            try {
                const res = await fetch("/api/subscription");
                const data = await res.json();
                if (res.ok) setSubscriptions(data.subscriptions);
            } catch {
                setSubscriptions([]);
            }
        }
        async function fetchDebts() {
            try {
                const res = await fetch("/api/debts");
                const data = await res.json();
                if (res.ok) setDebts(data.debts);
            } catch {
                setDebts([]);
            }
        }
        fetchGoals();
        fetchBudgets();
        fetchSubscriptions();
        fetchDebts();
    }, []);

    // Dynamic savings goals
    const dynamicGoals = goals.map((g) => ({
        title: `🎯 ${g.name} Goal`,
        progress: Math.round((g.saved / g.target) * 100),
        goal: `$${g.target}`,
        current: `$${g.saved}`,
        completed: g.saved >= g.target,
    }));

    // Dynamic budget missions
    const dynamicBudgets = budgets.map((b) => ({
        title: `📊 ${b.category} Budget (${b.month})`,
        progress: Math.round((b.amount / 5000) * 100), // Example: out of $5000
        goal: `$${b.amount}`,
        current: `$${b.amount}`,
        completed: b.amount > 0,
    }));

    // Dynamic subscription missions
    const activeSubscriptions = subscriptions.filter(s => s.status === "Active").length;
    const subscriptionMissions = [];
    if (activeSubscriptions > 0) {
        subscriptionMissions.push({
            title: "🔔 Subscribed!",
            message: `You have ${activeSubscriptions} active subscriptions.`,
            badge: "Subscriber",
        });
    }
    if (subscriptions.length >= 5) {
        subscriptionMissions.push({
            title: "📦 Subscription Collector",
            message: "You have 5 or more subscriptions.",
            badge: "Collector",
        });
    }

    // Dynamic debt missions
    const debtMissions = [];
    if (debts.length > 0) {
        debtMissions.push({
            title: "💸 Debt Tracker",
            message: `You have ${debts.length} active debts.`,
            badge: "Debt Manager",
        });
    }
    const paidOffDebts = debts.filter(d => d.amount === 0).length;
    if (paidOffDebts > 0) {
        debtMissions.push({
            title: "✅ Debt Free",
            message: `You paid off ${paidOffDebts} debts!`,
            badge: "Debt Breaker",
        });
    }

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-emerald-100 to-slate-200 dark:from-emerald-900 dark:to-slate-800 text-slate-800 dark:text-slate-200">
            <main className="flex-1 max-w-6xl mx-auto p-10 space-y-10">
                <h1 className="text-3xl font-bold text-emerald-900 dark:text-emerald-200 mb-8 text-center">
                    Your Achievements & Missions
                </h1>

                {/* Savings Goals Visuals */}
                <section>
                    <h2 className="mb-4 text-2xl font-semibold text-emerald-800 dark:text-emerald-300">
                        🎯 Savings Goals Progress
                    </h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {dynamicGoals.map((g, idx) => (
                            <div key={idx} className="p-4 bg-white dark:bg-slate-900 border border-emerald-100 dark:border-emerald-900 shadow rounded-xl">
                                <h3 className="text-xl font-semibold">{g.title}</h3>
                                <p className="text-gray-700 dark:text-gray-300">
                                    Progress: {g.current} / {g.goal}
                                </p>
                                <div className="w-full h-4 mt-2 bg-gray-200 dark:bg-slate-800 rounded-full">
                                    <div
                                        className={`h-4 ${g.completed ? "bg-green-500" : "bg-blue-500"} rounded-full`}
                                        style={{ width: `${g.progress}%` }}
                                    ></div>
                                </div>
                                <p className={`mt-1 text-sm ${g.completed ? "text-green-600" : "text-blue-600"}`}>
                                    {g.progress}% {g.completed ? "Completed!" : "completed"}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Budgets Visuals */}
                <section>
                    <h2 className="mb-4 text-2xl font-semibold text-emerald-800 dark:text-emerald-300">
                        📊 Budgets Overview
                    </h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {dynamicBudgets.map((b, idx) => (
                            <div key={idx} className="p-4 bg-white dark:bg-slate-900 border border-emerald-100 dark:border-emerald-900 shadow rounded-xl">
                                <h3 className="text-xl font-semibold">{b.title}</h3>
                                <p className="text-gray-700 dark:text-gray-300">
                                    Amount: {b.current}
                                </p>
                                <div className="w-full h-4 mt-2 bg-gray-200 dark:bg-slate-800 rounded-full">
                                    <div
                                        className={`h-4 ${b.completed ? "bg-emerald-500" : "bg-yellow-500"} rounded-full`}
                                        style={{ width: `${b.progress}%` }}
                                    ></div>
                                </div>
                                <p className={`mt-1 text-sm ${b.completed ? "text-emerald-600" : "text-yellow-600"}`}>
                                    {b.progress}% {b.completed ? "Budget Set!" : "set"}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Subscription Missions */}
                <section>
                    <h2 className="mb-4 text-2xl font-semibold text-emerald-800 dark:text-emerald-300">
                        🔔 Subscription Missions
                    </h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {subscriptionMissions.map((m, idx) => (
                            <div key={idx} className="p-4 bg-white dark:bg-slate-900 border border-purple-100 dark:border-purple-900 shadow rounded-xl">
                                <h3 className="text-xl font-semibold">{m.title}</h3>
                                <p className="text-gray-700 dark:text-gray-300">{m.message}</p>
                                <span className="inline-block px-3 py-1 mt-2 text-sm text-purple-700 bg-purple-100 rounded-full">
                                    {m.badge}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Debt Missions */}
                <section>
                    <h2 className="mb-4 text-2xl font-semibold text-emerald-800 dark:text-emerald-300">
                        💸 Debt Missions
                    </h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {debtMissions.map((m, idx) => (
                            <div key={idx} className="p-4 bg-white dark:bg-slate-900 border border-red-100 dark:border-red-900 shadow rounded-xl">
                                <h3 className="text-xl font-semibold">{m.title}</h3>
                                <p className="text-gray-700 dark:text-gray-300">{m.message}</p>
                                <span className="inline-block px-3 py-1 mt-2 text-sm text-red-700 bg-red-100 rounded-full">
                                    {m.badge}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="mt-10 text-center text-gray-500 dark:text-gray-400">
                    <p>Keep up the great work! Every step counts towards your financial freedom.</p>
                </div>
                <div className="mt-10 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Powered by &copy; Team Prism</p>
                </div>
            </main>
        </div>
    );
}