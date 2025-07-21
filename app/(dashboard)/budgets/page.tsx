"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Budget {
    _id: string;
    category: string;
    amount: number;
    month: string;
}

export default function BudgetPage() {
    const [budgets, setBudgets] = useState<Budget[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        async function fetchBudgets() {
            try {
                const res = await fetch("/api/budgets");
                const data = await res.json();
                if (!res.ok) throw new Error(data.message || "Failed to load");
                setBudgets(data.budgets);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchBudgets();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this budget?")) return;
        const res = await fetch(`/api/budgets/${id}`, { method: "DELETE" });
        const data = await res.json();
        if (res.ok) {
            setBudgets((prev) => prev.filter((b) => b._id !== id));
        } else {
            alert(data.message || "Delete failed");
        }
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-emerald-100 to-slate-200 dark:from-emerald-900 dark:to-slate-800 text-slate-800 dark:text-slate-200">
            <main className="flex-1 max-w-4xl mx-auto p-10 space-y-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold text-emerald-900 dark:text-emerald-200">Budgets</h2>
                    <Link href="/budgets/add">
                        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg shadow-md transition duration-200 font-semibold hover:scale-105">
                            + Add Budget
                        </button>
                    </Link>
                </div>

                <div className="p-6 bg-white dark:bg-slate-900 shadow-2xl rounded-2xl border border-emerald-100 dark:border-emerald-900 animate-fade-in">
                    <h3 className="mb-4 text-lg font-semibold text-emerald-900 dark:text-emerald-200">
                        Budget Overview
                    </h3>
                    {loading && <p className="text-gray-500">Loading...</p>}
                    {error && <p className="text-red-600">{error}</p>}
                    {!loading && budgets.length === 0 && (
                        <p className="text-gray-500">No budgets found.</p>
                    )}
                    {budgets.length > 0 && (
                        <table className="w-full text-sm text-left">
                            <thead>
                                <tr className="text-emerald-700 dark:text-emerald-300 border-b">
                                    <th className="pb-2">Category</th>
                                    <th className="pb-2">Month</th>
                                    <th className="pb-2 text-right">Amount</th>
                                    <th className="pb-2 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {budgets.map((b, i) => (
                                    <tr
                                        key={b._id}
                                        className={`border-t rounded transition ${i % 2 === 0 ? "bg-slate-50 dark:bg-slate-800" : ""} hover:bg-emerald-50 dark:hover:bg-emerald-900`}
                                    >
                                        <td className="py-3">{b.category}</td>
                                        <td>{b.month}</td>
                                        <td className="text-right">${b.amount.toFixed(2)}</td>
                                        <td className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => router.push(`/budgets/edit/${b._id}`)}
                                                    className="text-sm text-emerald-700 hover:bg-emerald-100 px-2 py-1 rounded dark:text-emerald-300 dark:hover:bg-emerald-800"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(b._id)}
                                                    className="text-sm text-red-600 hover:bg-red-100 px-2 py-1 rounded dark:text-red-400 dark:hover:bg-red-900"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </main>
        </div>
    );
}