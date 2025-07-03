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
    // const [username, setUsername] = useState("");
    // const [transactions, setTransactions] = useState<any[]>([]);
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
    // useEffect(() => {
    //     async function fetchUser() {
    //         try {
    //             const res = await fetch("/api/auth/me");
    //             const data = await res.json();
    //             if (res.ok) {
    //                 setUsername(data.user.username);
    //             }
    //         } catch (err) {
    //             console.error("Failed to load user", err);
    //         }
    //     }
    //     async function fetchRecentTransactions() {
    //         try {
    //             const res = await fetch("/api/transactions");
    //             const data = await res.json();
    //             if (res.ok) {
    //                 setTransactions(data.transactions.slice(0, 5));
    //             }
    //         } catch (err) {
    //             console.error("Failed to load transactions", err);
    //         }
    //     }

    //     fetchUser();
    //     fetchRecentTransactions();
    // }, []);
    return (
        <div className="flex min-h-screen text-gray-800 bg-gray-50">
            {/* Sidebar */}

            {/* Main Content */}
            <main className="flex-1 p-8 space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">
                        {username ? `Welcome, ${username}!` : "Welcome!"}
                    </h2>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="p-4 text-center bg-white rounded shadow">
                        <p className="text-sm text-gray-500">Total Income</p>
                        <p className="text-xl font-bold">
                            ${income.toLocaleString()}
                        </p>
                    </div>
                    <div className="p-4 text-center bg-white rounded shadow">
                        <p className="text-sm text-gray-500">Total Expenses</p>
                        <p className="text-xl font-bold">
                            ${expenses.toLocaleString()}
                        </p>
                    </div>
                    <div className="p-4 text-center bg-white rounded shadow">
                        <p className="text-sm text-gray-500">
                            Savings Progress
                        </p>
                        <p className="text-xl font-bold">
                            ${savings.toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* Charts */}
                {/* <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="p-4 bg-white rounded shadow">
                        <h3 className="mb-2 font-semibold">
                            Expense Categories
                        </h3>
                        <div className="max-w-[300px] mx-auto">
                            <Doughnut
                                data={{
                                    labels: Object.keys(monthly),
                                    datasets: [
                                        {
                                            label: "Expenses",
                                            data: Object.values(monthly),
                                            backgroundColor: [
                                                "#f97316",
                                                "#10b981",
                                                "#3b82f6",
                                                "#facc15",
                                            ],
                                            borderWidth: 1,
                                        },
                                    ],
                                }}
                                options={{
                                    plugins: {
                                        legend: {
                                            labels: {
                                                color: "#1f2937", // text-gray-800
                                            },
                                        },
                                    },
                                }}
                            />
                        </div>
                    </div>
                    <div className="p-4 bg-white rounded shadow">
                        <h3 className="mb-2 font-semibold">Monthly Trends</h3>
                        <Bar
                            data={{
                                labels: [
                                    "Jan",
                                    "Feb",
                                    "Mar",
                                    "Apr",
                                    "May",
                                    "Jun",
                                ],
                                datasets: [
                                    {
                                        label: "Expenses",
                                        data: [400, 450, 500, 600, 550, 700],
                                        backgroundColor: "#3b82f6",
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
                                        ticks: { color: "#1f2937" }, // text-gray-800
                                    },
                                    y: {
                                        beginAtZero: true,
                                        ticks: { color: "#1f2937" }, // text-gray-800
                                    },
                                },
                            }}
                        />
                    </div>
                </div> */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="p-4 bg-white rounded shadow">
                        <h3 className="mb-2 font-semibold">
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
                                                "#f97316",
                                                "#10b981",
                                                "#3b82f6",
                                                "#facc15",
                                                "#a855f7",
                                                "#ef4444",
                                            ],
                                            borderWidth: 1,
                                        },
                                    ],
                                }}
                                options={{
                                    plugins: {
                                        legend: {
                                            labels: {
                                                color: "#1f2937",
                                            },
                                        },
                                    },
                                }}
                            />
                        </div>
                    </div>
                    <div className="p-4 bg-white rounded shadow">
                        <h3 className="mb-2 font-semibold">Monthly Trends</h3>
                        <Bar
                            data={{
                                labels: Object.keys(monthly),
                                datasets: [
                                    {
                                        label: "Expenses",
                                        data: Object.values(monthly),
                                        backgroundColor: "#3b82f6",
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
                                        ticks: { color: "#1f2937" },
                                    },
                                    y: {
                                        beginAtZero: true,
                                        ticks: { color: "#1f2937" },
                                    },
                                },
                            }}
                        />
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="p-4 bg-white rounded shadow">
                    <h3 className="mb-4 font-semibold">Recent Transactions</h3>
                    <table className="w-full text-sm text-left">
                        <thead>
                            <tr className="text-gray-600 border-b">
                                <th className="pb-2">Date</th>
                                <th className="pb-2">Description</th>
                                <th className="pb-2">Category</th>
                                <th className="pb-2 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {[
                                {
                                    date: "Apr 20, 2024",
                                    desc: "Groceries",
                                    cat: "Groceries",
                                    amt: "$150.00",
                                },
                                {
                                    date: "Apr 15, 2024",
                                    desc: "Salary",
                                    cat: "Income",
                                    amt: "$3,000.00",
                                },
                                {
                                    date: "Apr 01, 2024",
                                    desc: "Rent",
                                    cat: "Rent",
                                    amt: "$1,200.00",
                                },
                                {
                                    date: "Mar 22, 2024",
                                    desc: "Internet",
                                    cat: "Utilities",
                                    amt: "$60.00",
                                },
                                {
                                    date: "Mar 19, 2024",
                                    desc: "Dining Out",
                                    cat: "Entertainment",
                                    amt: "$45.00",
                                },
                            ].map((t, i) => (
                                <tr key={i} className="text-gray-800 border-t">
                                    <td className="py-2">{t.date}</td>
                                    <td>{t.desc}</td>
                                    <td>{t.cat}</td>
                                    <td className="text-right">{t.amt}</td>
                                </tr>
                            ))} */}
                            {transactions.map((t, i) => (
                                <tr key={i} className="text-gray-800 border-t">
                                    <td className="py-2">
                                        {new Date(t.date).toLocaleDateString()}
                                    </td>
                                    <td>{t.description}</td>
                                    <td>{t.category}</td>
                                    <td className="text-right">
                                        ${t.amount.toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
