"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function EditTransactionPage() {
    const { id } = useParams();
    const router = useRouter();

    const [form, setForm] = useState({
        date: "",
        description: "",
        category: "",
        amount: "",
    });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        async function fetchTransaction() {
            try {
                const res = await fetch(`/api/transactions/${id}`);
                const data = await res.json();

                if (!res.ok) throw new Error(data.message || "Failed to load");

                const { date, description, category, amount } = data.transaction;

                setForm({
                    date: new Date(date).toISOString().split("T")[0],
                    description,
                    category,
                    amount: amount.toString(),
                });
            } catch (err: any) {
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        }

        fetchTransaction();
    }, [id]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");
        setSuccess(false);

        try {
            const res = await fetch(`/api/transactions/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...form,
                    amount: parseFloat(form.amount),
                }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Update failed");

            setSuccess(true);
            setTimeout(() => router.push("/transaction"), 1000);
        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-emerald-100 to-slate-200 dark:from-emerald-900 dark:to-slate-800">
            <Card className="w-full max-w-md p-6 bg-white dark:bg-slate-900 shadow-2xl rounded-2xl animate-fade-in border border-emerald-100 dark:border-emerald-900">
                <CardContent className="space-y-6">
                    <p
                        onClick={() => router.push("/transaction")}
                        className="w-full text-[15px] text-emerald-700 dark:text-emerald-300 cursor-pointer hover:underline"
                    >
                        ← Back to Transactions
                    </p>
                    <h1 className="text-3xl font-bold text-center text-emerald-900 dark:text-emerald-200">
                        Edit Transaction
                    </h1>

                    {loading ? (
                        <p className="text-center text-gray-500">Loading...</p>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="date" className="text-emerald-900 dark:text-emerald-200">
                                    Date
                                </Label>
                                <Input
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={form.date}
                                    onChange={handleChange}
                                    required
                                    className="text-black dark:text-white bg-emerald-50 dark:bg-slate-800 border-none"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-emerald-900 dark:text-emerald-200">
                                    Description
                                </Label>
                                <Input
                                    type="text"
                                    id="description"
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    required
                                    className="text-black dark:text-white bg-emerald-50 dark:bg-slate-800 border-none"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category" className="text-emerald-900 dark:text-emerald-200">
                                    Category
                                </Label>
                                <select
                                    id="category"
                                    name="category"
                                    value={form.category}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 text-black dark:text-white bg-emerald-50 dark:bg-slate-800 border-none rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                >
                                    <option value="">Select Category</option>
                                    <option value="Groceries">Groceries</option>
                                    <option value="Rent">Rent</option>
                                    <option value="Utilities">Utilities</option>
                                    <option value="Salary">Salary</option>
                                    <option value="Entertainment">Entertainment</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="amount" className="text-emerald-900 dark:text-emerald-200">
                                    Amount ($)
                                </Label>
                                <Input
                                    type="number"
                                    id="amount"
                                    name="amount"
                                    value={form.amount}
                                    onChange={handleChange}
                                    required
                                    className="text-black dark:text-white bg-emerald-50 dark:bg-slate-800 border-none"
                                />
                            </div>

                            {error && (
                                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                            )}
                            {success && (
                                <p className="text-sm text-green-600 dark:text-green-400">
                                    ✅ Transaction updated!
                                </p>
                            )}

                            <Button
                                type="submit"
                                disabled={submitting}
                                className="w-full text-white bg-emerald-600 hover:bg-emerald-700 transition-all font-semibold rounded-lg shadow-md disabled:opacity-70"
                            >
                                {submitting ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <svg
                                            className="w-4 h-4 text-white animate-spin"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8v8H4z"
                                            />
                                        </svg>
                                        Updating...
                                    </div>
                                ) : (
                                    "Update Transaction"
                                )}
                            </Button>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}