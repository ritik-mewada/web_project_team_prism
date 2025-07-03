"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Goal {
    _id: string;
    name: string;
    target: number;
    saved: number;
}

export default function SavingsGoalPage() {
    const [goals, setGoals] = useState<Goal[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        async function fetchGoals() {
            try {
                const res = await fetch("/api/saving-goal");
                const data = await res.json();
                if (!res.ok) throw new Error(data.message || "Failed to load");
                setGoals(data.goals);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchGoals();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this goal?")) return;
        const res = await fetch(`/api/saving-goal/${id}`, { method: "DELETE" });
        const data = await res.json();
        if (res.ok) {
            setGoals((prev) => prev.filter((g) => g._id !== id));
        } else {
            alert(data.message || "Delete failed");
        }
    };

    return (
        <div className="flex min-h-screen px-4 py-8 text-gray-800 bg-gradient-to-br from-gray-50 to-blue-100">
            <main className="flex-1 max-w-4xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Savings Goals</h2>
                    <Link href="/saving-goal/add">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded shadow">
                            + Add Savings Goal
                        </button>
                    </Link>
                </div>

                <div className="p-6 bg-white shadow-xl rounded-xl animate-fade-in">
                    <h3 className="mb-4 text-lg font-semibold">Your Goals</h3>
                    {loading && <p>Loading...</p>}
                    {error && <p className="text-red-600">{error}</p>}
                    {!loading && goals.length === 0 && (
                        <p className="text-gray-500">No savings goals found.</p>
                    )}
                    {goals.length > 0 && (
                        <table className="w-full text-sm text-left">
                            <thead>
                                <tr className="text-gray-600 border-b">
                                    <th className="pb-2">Goal</th>
                                    <th className="pb-2 text-right">Target</th>
                                    <th className="pb-2 text-right">Saved</th>
                                </tr>
                            </thead>
                            <tbody>
                                {goals.map((g) => (
                                    <tr
                                        key={g._id}
                                        className="border-t hover:bg-gray-50"
                                    >
                                        <td className="py-3">{g.name}</td>
                                        <td className="text-right">
                                            ${g.target.toFixed(2)}
                                        </td>
                                        <td className="text-right">
                                            ${g.saved.toFixed(2)}
                                            <div className="flex justify-end gap-2 mt-1">
                                                <button
                                                    onClick={() =>
                                                        router.push(
                                                            `/saving-goal/edit/${g._id}`
                                                        )
                                                    }
                                                    className="text-sm text-blue-600 hover:underline"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(g._id)
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
