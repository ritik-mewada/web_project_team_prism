"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function EditBudget() {
    const { id } = useParams();
    const router = useRouter();
    const [form, setForm] = useState({ category: "", amount: "", month: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        async function fetchBudget() {
            try {
                const res = await fetch(`/api/budgets/${id}`);
                const data = await res.json();
                if (!res.ok) throw new Error(data.message || "Not found");
                setForm({
                    category: data.budget.category,
                    amount: data.budget.amount.toString(),
                    month: data.budget.month,
                });
            } catch (err: any) {
                setError(err.message);
            }
        }
        fetchBudget();
    }, [id]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await fetch(`/api/budgets/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    amount: parseFloat(form.amount),
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Update failed");
            setSuccess(true);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-br from-gray-50 to-blue-100">
            <Card className="w-full max-w-md p-6 bg-white shadow-2xl rounded-2xl animate-fade-in">
                <CardContent className="space-y-6">
                    <p
                        onClick={() => router.push("/budgets")}
                        className="self-start text-[15px] w-full max-w-md mb-4 text-blue-600 cursor-pointer hover:underline"
                    >
                        ← Back to Budgets
                    </p>
                    <h1 className="text-3xl font-bold text-center text-gray-800">
                        Edit Budget
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <select
                                id="category"
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-black bg-gray-100 border-none rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="Groceries">Groceries</option>
                                <option value="Rent">Rent</option>
                                <option value="Utilities">Utilities</option>
                                <option value="Entertainment">
                                    Entertainment
                                </option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="amount">Amount</Label>
                            <Input
                                id="amount"
                                name="amount"
                                type="number"
                                placeholder="e.g., 250"
                                value={form.amount}
                                onChange={handleChange}
                                className="text-black bg-gray-100 border-none"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="month">Month</Label>
                            <select
                                id="month"
                                name="month"
                                value={form.month}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-black bg-gray-100 border-none rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            >
                                <option value="">Select Month</option>
                                {[
                                    "January",
                                    "February",
                                    "March",
                                    "April",
                                    "May",
                                    "June",
                                    "July",
                                    "August",
                                    "September",
                                    "October",
                                    "November",
                                    "December",
                                ].map((m) => (
                                    <option key={m} value={m}>
                                        {m}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {error && (
                            <p className="text-sm text-red-600">{error}</p>
                        )}
                        {success && (
                            <p className="text-sm text-green-600">
                                Budget updated successfully!
                            </p>
                        )}

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-70"
                        >
                            {loading ? "Updating..." : "Update Budget"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
