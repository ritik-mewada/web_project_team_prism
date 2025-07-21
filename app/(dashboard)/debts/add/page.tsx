"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function AddDebt() {
    const router = useRouter();
    const [form, setForm] = useState({ type: "", amount: "", dueDate: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess(false);
        try {
            const res = await fetch("/api/debts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    amount: parseFloat(form.amount),
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Error saving");

            setSuccess(true);
            setForm({ type: "", amount: "", dueDate: "" });
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-emerald-100 to-slate-200 dark:from-emerald-900 dark:to-slate-800">
            <Card className="w-full max-w-md p-6 bg-white dark:bg-slate-900 shadow-2xl rounded-2xl animate-fade-in border border-emerald-100 dark:border-emerald-900">
                <CardContent className="space-y-6">
                    <p
                        onClick={() => router.push("/debts")}
                        className="w-full text-[15px] text-emerald-700 dark:text-emerald-300 cursor-pointer hover:underline"
                    >
                        ← Back to Debts
                    </p>
                    <h1 className="text-3xl font-bold text-center text-emerald-900 dark:text-emerald-200">
                        Add Debt
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="type" className="text-emerald-900 dark:text-emerald-200">
                                Debt Type
                            </Label>
                            <select
                                id="type"
                                name="type"
                                value={form.type}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-black dark:text-white bg-emerald-50 dark:bg-slate-800 border-none rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                required
                            >
                                <option value="">Select Type</option>
                                <option value="Credit Card">Credit Card</option>
                                <option value="Loan">Loan</option>
                                <option value="Line of Credit">Line of Credit</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="amount" className="text-emerald-900 dark:text-emerald-200">
                                Amount
                            </Label>
                            <Input
                                id="amount"
                                name="amount"
                                type="number"
                                placeholder="e.g., 5000"
                                value={form.amount}
                                onChange={handleChange}
                                className="text-black dark:text-white bg-emerald-50 dark:bg-slate-800 border-none"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="dueDate" className="text-emerald-900 dark:text-emerald-200">
                                Due Date
                            </Label>
                            <Input
                                id="dueDate"
                                name="dueDate"
                                type="date"
                                value={form.dueDate}
                                onChange={handleChange}
                                className="text-black dark:text-white bg-emerald-50 dark:bg-slate-800 border-none"
                                required
                            />
                        </div>

                        {error && (
                            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                        )}
                        {success && (
                            <p className="text-sm text-green-600 dark:text-green-400">
                                Debt added successfully!
                            </p>
                        )}

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full text-white bg-emerald-600 hover:bg-emerald-700 transition-all font-semibold rounded-lg shadow-md disabled:opacity-70"
                        >
                            {loading ? (
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
                                    Saving...
                                </div>
                            ) : (
                                "Save Debt"
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}