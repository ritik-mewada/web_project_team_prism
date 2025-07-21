"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Subscription {
    _id: string;
    service: string;
    amount: number;
    frequency: string;
    status: string;
}

export default function SubscriptionsPage() {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        async function fetchSubscriptions() {
            try {
                const res = await fetch("/api/subscription");
                const data = await res.json();
                if (!res.ok) throw new Error(data.message || "Failed to load");
                setSubscriptions(data.subscriptions);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchSubscriptions();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this subscription?")) return;
        const res = await fetch(`/api/subscription/${id}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if (res.ok) {
            setSubscriptions((prev) => prev.filter((s) => s._id !== id));
        } else {
            alert(data.message || "Delete failed");
        }
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-emerald-100 to-slate-200 dark:from-emerald-900 dark:to-slate-800 text-slate-800 dark:text-slate-200 px-4 py-8">
            <main className="flex-1 max-w-4xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold text-emerald-900 dark:text-emerald-200">Subscriptions</h2>
                    <Link href="/subscriptions/add">
                        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg shadow-md transition duration-200 font-semibold hover:scale-105">
                            + Add Subscription
                        </button>
                    </Link>
                </div>

                <div className="p-6 bg-white dark:bg-slate-900 shadow-2xl rounded-2xl border border-emerald-100 dark:border-emerald-900 animate-fade-in">
                    <h3 className="mb-4 text-lg font-semibold text-emerald-900 dark:text-emerald-200">
                        Subscription Overview
                    </h3>
                    {loading && <p className="text-gray-500">Loading...</p>}
                    {error && <p className="text-red-600">{error}</p>}
                    {!loading && subscriptions.length === 0 && (
                        <p className="text-gray-500">No subscriptions found.</p>
                    )}
                    {subscriptions.length > 0 && (
                        <table className="w-full text-sm text-left">
                            <thead>
                                <tr className="text-emerald-700 dark:text-emerald-300 border-b">
                                    <th className="pb-2">Service</th>
                                    <th className="pb-2">Frequency</th>
                                    <th className="pb-2">Status</th>
                                    <th className="pb-2 text-right">Amount</th>
                                    <th className="pb-2 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {subscriptions.map((s, i) => (
                                    <tr
                                        key={s._id}
                                        className={`border-t rounded transition ${i % 2 === 0 ? "bg-slate-50 dark:bg-slate-800" : ""} hover:bg-emerald-50 dark:hover:bg-emerald-900`}
                                    >
                                        <td className="py-3">{s.service}</td>
                                        <td>{s.frequency}</td>
                                        <td>{s.status}</td>
                                        <td className="text-right">${s.amount.toFixed(2)}</td>
                                        <td className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => router.push(`/subscriptions/edit/${s._id}`)}
                                                    className="text-sm text-emerald-700 hover:bg-emerald-100 px-2 py-1 rounded dark:text-emerald-300 dark:hover:bg-emerald-800"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(s._id)}
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