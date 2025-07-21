"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AddSavingGoal() {
    const [form, setForm] = useState({
        name: "",
        target: "",
        saved: "",
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);
        setError("");
        try {
            const res = await fetch("/api/saving-goal", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: form.name,
                    target: parseFloat(form.target),
                    saved: form.saved ? parseFloat(form.saved) : 0,
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to save");
            setSuccess(true);
            setForm({ name: "", target: "", saved: "" });
        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-emerald-100 to-slate-200 dark:from-emerald-900 dark:to-slate-800">
            <Card className="w-full max-w-md p-6 bg-white dark:bg-slate-900 shadow-2xl rounded-2xl animate-fade-in border border-emerald-100 dark:border-emerald-900">
                <CardContent className="space-y-6">
                    <p
                        onClick={() => router.push("/saving-goal")}
                        className="w-full text-[15px] text-emerald-700 dark:text-emerald-300 cursor-pointer hover:underline"
                    >
                        ← Back to Savings Goals
                    </p>
                    <h1 className="text-3xl font-bold text-center text-emerald-900 dark:text-emerald-200">
                        Add Savings Goal
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-emerald-900 dark:text-emerald-200">
                                Goal Name
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="e.g., Tuition Fees"
                                className="text-black dark:text-white bg-emerald-50 dark:bg-slate-800 border-none"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="target" className="text-emerald-900 dark:text-emerald-200">
                                Target Amount ($)
                            </Label>
                            <Input
                                id="target"
                                type="number"
                                name="target"
                                placeholder="e.g., 5000"
                                className="text-black dark:text-white bg-emerald-50 dark:bg-slate-800 border-none"
                                value={form.target}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="saved" className="text-emerald-900 dark:text-emerald-200">
                                Amount Already Saved ($)
                            </Label>
                            <Input
                                id="saved"
                                type="number"
                                name="saved"
                                placeholder="e.g., 1500"
                                className="text-black dark:text-white bg-emerald-50 dark:bg-slate-800 border-none"
                                value={form.saved}
                                onChange={handleChange}
                            />
                        </div>

                        {success && (
                            <p className="text-sm text-green-600 dark:text-green-400">
                                ✅ Goal saved!
                            </p>
                        )}

                        {error && (
                            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
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
                                "Save Goal"
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}