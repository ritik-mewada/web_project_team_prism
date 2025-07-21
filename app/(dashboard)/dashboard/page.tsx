"use client";

import { Bar, Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
} from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement
);

export default function Page() {
    const [username, setUsername] = useState("");
    const [income, setIncome] = useState(0);
    const [expenses, setExpenses] = useState(0);
    const [savings, setSavings] = useState(0);
    const [categories, setCategories] = useState<any>({});
    const [monthly, setMonthly] = useState<any>({});
    const [transactions, setTransactions] = useState<any[]>([]);

    useEffect(() => {
        async function fetchDashboard() {
            try {
                const [meRes, summaryRes, transRes] = await Promise.all([
                    fetch("/api/auth/me"),
                    fetch("/api/dashboard/summary"),
                    fetch("/api/transactions"),
                ]);

                const meData = await meRes.json();
                const summaryData = await summaryRes.json();
                const transData = await transRes.json();

                if (meRes.ok) {
                    setUsername(meData.user.username);
                }

                if (summaryRes.ok) {
                    setIncome(summaryData.income);
                    setExpenses(summaryData.expenses);
                    setSavings(summaryData.savings);
                    setCategories(summaryData.categories);
                    setMonthly(summaryData.monthly);
                }

                if (transRes.ok) {
                    setTransactions(transData.transactions.slice(0, 5));
                }
            } catch (err) {
                console.error("Failed to load dashboard", err);
            }
        }

        fetchDashboard();
    }, []);

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-emerald-100 to-slate-200 dark:from-emerald-900 dark:to-slate-800 text-slate-800 dark:text-slate-200">
            <main className="flex-1 p-10 space-y-8 max-w-6xl mx-auto">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold text-emerald-900 dark:text-emerald-200">
                        {username ? `Welcome, ${username}!` : "Welcome!"}
                    </h2>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <div className="p-6 text-center bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-emerald-100 dark:border-emerald-900">
                        <p className="text-sm text-emerald-600 dark:text-emerald-300">Total Income</p>
                        <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-200">
                            ${income.toLocaleString()}
                        </p>
                    </div>
                    <div className="p-6 text-center bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-emerald-100 dark:border-emerald-900">
                        <p className="text-sm text-rose-600 dark:text-rose-300">Total Expenses</p>
                        <p className="text-2xl font-bold text-rose-900 dark:text-rose-200">
                            ${expenses.toLocaleString()}
                        </p>
                    </div>
                    <div className="p-6 text-center bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-emerald-100 dark:border-emerald-900">
                        <p className="text-sm text-blue-600 dark:text-blue-300">Savings Progress</p>
                        <p className="text-2xl font-bold text-blue-900 dark:text-blue-200">
                            ${savings.toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-emerald-100 dark:border-emerald-900">
                        <h3 className="mb-4 font-semibold text-emerald-900 dark:text-emerald-200">
                            Expense Categories
                        </h3>
                        <div className="max-w-[300px] mx-auto">
                            <Doughnut
                                data={{
                                    labels: Object.keys(categories),
                                    datasets: [
                                        {
                                            data: Object.values(categories),
                                            backgroundColor: [
                                                "#f97316", // orange
                                                "#10b981", // emerald
                                                "#3b82f6", // blue
                                                "#facc15", // yellow
                                                "#a855f7", // purple
                                                "#ef4444", // red
                                            ],
                                            borderWidth: 1,
                                        },
                                    ],
                                }}
                                options={{
                                    plugins: {
                                        legend: {
                                            labels: {
                                                color: "#059669", // emerald-600
                                            },
                                        },
                                    },
                                }}
                            />
                        </div>
                    </div>
                    <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-emerald-100 dark:border-emerald-900">
                        <h3 className="mb-4 font-semibold text-emerald-900 dark:text-emerald-200">Monthly Trends</h3>
                        <Bar
                            data={{
                                labels: Object.keys(monthly),
                                datasets: [
                                    {
                                        label: "Expenses",
                                        data: Object.values(monthly),
                                        backgroundColor: "#10b981", // emerald
                                        borderRadius: 6,
                                    },
                                ],
                            }}
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: { display: false },
                                },
                                scales: {
                                    x: {
                                        ticks: { color: "#059669" }, // emerald-600
                                    },
                                    y: {
                                        beginAtZero: true,
                                        ticks: { color: "#059669" }, // emerald-600
                                    },
                                },
                            }}
                        />
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-emerald-100 dark:border-emerald-900">
                    <h3 className="mb-4 font-semibold text-emerald-900 dark:text-emerald-200">Recent Transactions</h3>
                    <table className="w-full text-sm text-left">
                        <thead>
                            <tr className="text-emerald-700 dark:text-emerald-300 border-b">
                                <th className="pb-2">Date</th>
                                <th className="pb-2">Description</th>
                                <th className="pb-2">Category</th>
                                <th className="pb-2 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((t, i) => (
                                <tr key={i} className="border-t hover:bg-emerald-50 dark:hover:bg-emerald-900 transition">
                                    <td className="py-2">{new Date(t.date).toLocaleDateString()}</td>
                                    <td>{t.description}</td>
                                    <td>{t.category}</td>
                                    <td className="text-right">${t.amount.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}