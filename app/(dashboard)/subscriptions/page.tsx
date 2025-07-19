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
                console.log("subsaducsa", data.subscriptions);
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
        <div className="flex min-h-screen px-4 py-8 text-gray-800 bg-gradient-to-br from-gray-50 to-blue-100">
            <main className="flex-1 max-w-4xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Subscriptions</h2>
                    <Link href="/subscriptions/add">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded shadow">
                            + Add Subscription
                        </button>
                    </Link>
                </div>

                <div className="p-6 bg-white shadow-xl rounded-xl animate-fade-in">
                    <h3 className="mb-4 text-lg font-semibold">
                        Subscription Overview
                    </h3>
                    {loading && <p>Loading...</p>}
                    {error && <p className="text-red-600">{error}</p>}
                    {!loading && subscriptions.length === 0 && (
                        <p className="text-gray-500">No subscriptions found.</p>
                    )}
                    {subscriptions.length > 0 && (
                        <table className="w-full text-sm text-left">
                            <thead>
                                <tr className="text-gray-600 border-b">
                                    <th className="pb-2">Service</th>
                                    <th className="pb-2">Frequency</th>
                                    <th className="pb-2">Status</th>
                                    <th className="pb-2 text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {subscriptions.map((s) => (
                                    <tr
                                        key={s._id}
                                        className="border-t hover:bg-gray-50"
                                    >
                                        <td className="py-3">{s.service}</td>
                                        <td>{s.frequency}</td>
                                        <td>{s.status}</td>
                                        <td className="text-right">
                                            ${s.amount.toFixed(2)}
                                            <div className="flex justify-end gap-2 mt-1">
                                                <button
                                                    onClick={() =>
                                                        router.push(
                                                            `/subscriptions/edit/${s._id}`
                                                        )
                                                    }
                                                    className="text-sm text-blue-600 hover:underline"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(s._id)
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
