"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Transaction {
    _id: string;
    date: string;
    description: string;
    category: string;
    amount: string;
}

export default function Page() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        async function fetchTransactions() {
            try {
                const res = await fetch("/api/transactions");
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message || "Failed to load transactions");
                }

                setTransactions(data.transactions);
            } catch (err) {
                setError(
                    typeof err === "object" && err !== null && "message" in err
                        ? String((err as { message?: string }).message)
                        : "Something went wrong"
                );
            } finally {
                setLoading(false);
            }
        }
        fetchTransactions();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this transaction?")) return;
        try {
            const res = await fetch(`/api/transactions/${id}`, { method: "DELETE" });
            if (!res.ok) {
                const data = await res.json();
                alert(data.message || "Failed to delete");
                return;
            }
            setTransactions(transactions.filter((t) => t._id !== id));
        } catch (err) {
            alert("Error deleting transaction");
        }
    };

    const handleEdit = (transaction: Transaction) => {
        router.push(`/transaction/edit/${transaction._id}`);
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-emerald-100 to-slate-200 dark:from-emerald-900 dark:to-slate-800 text-slate-800 dark:text-slate-200">
            <main className="flex-1 max-w-5xl mx-auto p-10 space-y-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold text-emerald-900 dark:text-emerald-200">
                        Transactions
                    </h2>
                    <Link href="/transaction/add">
                        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg shadow-md transition duration-200 font-semibold hover:scale-105">
                            + Add Transaction
                        </button>
                    </Link>
                </div>

                <div className="p-6 overflow-x-auto bg-white dark:bg-slate-900 shadow-2xl rounded-2xl border border-emerald-100 dark:border-emerald-900 animate-fade-in">
                    <h3 className="mb-4 text-lg font-semibold text-emerald-900 dark:text-emerald-200">
                        All Transactions
                    </h3>

                    {loading && <p className="text-gray-500">Loading...</p>}
                    {error && <p className="text-red-600">{error}</p>}

                    {!loading && !error && (
                        <table className="w-full text-sm text-left">
                            <thead>
                                <tr className="text-emerald-700 dark:text-emerald-300 border-b">
                                    <th className="pb-2">Date</th>
                                    <th className="pb-2">Description</th>
                                    <th className="pb-2">Category</th>
                                    <th className="pb-2 text-right">Amount</th>
                                    <th className="pb-2 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="py-4 text-center text-gray-500">
                                            No transactions found.
                                        </td>
                                    </tr>
                                ) : (
                                    transactions.map((t, idx) => (
                                        <tr
                                            key={t._id}
                                            className={`border-t rounded transition ${idx % 2 === 0 ? "bg-slate-50 dark:bg-slate-800" : ""} hover:bg-emerald-50 dark:hover:bg-emerald-900`}
                                        >
                                            <td className="py-3">{new Date(t.date).toLocaleDateString()}</td>
                                            <td>{t.description}</td>
                                            <td>{t.category}</td>
                                            <td className="text-right">${Number(t.amount).toFixed(2)}</td>
                                            <td className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => handleEdit(t)}
                                                        className="text-sm text-emerald-700 hover:bg-emerald-100 px-2 py-1 rounded dark:text-emerald-300 dark:hover:bg-emerald-800"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(t._id)}
                                                        className="text-sm text-emerald-700 hover:bg-emerald-100 px-2 py-1 rounded dark:text-emerald-300 dark:hover:bg-emerald-800 dark:text-red-400"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </main>
        </div>
    );
}