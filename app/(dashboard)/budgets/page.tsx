// app/(dashboard)/budgets/page.tsx
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
        <div className="flex min-h-screen px-4 py-8 text-gray-800 bg-gradient-to-br from-gray-50 to-blue-100">
            <main className="flex-1 max-w-4xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Budgets</h2>
                    <Link href="/budgets/add">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded shadow">
                            + Add Budget
                        </button>
                    </Link>
                </div>

                <div className="p-6 bg-white shadow-xl rounded-xl animate-fade-in">
                    <h3 className="mb-4 text-lg font-semibold">
                        Budget Overview
                    </h3>
                    {loading && <p>Loading...</p>}
                    {error && <p className="text-red-600">{error}</p>}
                    {!loading && budgets.length === 0 && (
                        <p className="text-gray-500">No budgets found.</p>
                    )}
                    {budgets.length > 0 && (
                        <table className="w-full text-sm text-left">
                            <thead>
                                <tr className="text-gray-600 border-b">
                                    <th className="pb-2">Category</th>
                                    <th className="pb-2">Month</th>
                                    <th className="pb-2 text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {budgets.map((b) => (
                                    <tr
                                        key={b._id}
                                        className="border-t hover:bg-gray-50"
                                    >
                                        <td className="py-3">{b.category}</td>
                                        <td>{b.month}</td>
                                        <td className="text-right">
                                            ${b.amount.toFixed(2)}
                                            <div className="flex justify-end gap-2 mt-1">
                                                <button
                                                    onClick={() =>
                                                        router.push(
                                                            `/budgets/edit/${b._id}`
                                                        )
                                                    }
                                                    className="text-sm text-blue-600 hover:underline"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(b._id)
                                                    }
                                                    className="text-sm text-red-600 hover:underline"
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

