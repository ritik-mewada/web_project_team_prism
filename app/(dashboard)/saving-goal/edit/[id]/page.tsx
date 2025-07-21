"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function EditSavingGoal() {
    const { id } = useParams();
    const router = useRouter();

    const [goal, setGoal] = useState({
        name: "",
        target: "",
        saved: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (!id) return;
        const fetchGoal = async () => {
            try {
                const res = await fetch(`/api/saving-goal/${id}`);
                const data = await res.json();
                if (res.ok) {
                    setGoal({
                        name: data.savingGoal.name,
                        target: data.savingGoal.target,
                        saved: data.savingGoal.saved,
                    });
                } else {
                    setError(data.message || "Failed to load goal");
                }
            } catch (err) {
                setError("Something went wrong");
            }
        };
        fetchGoal();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGoal({ ...goal, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess(false);
        try {
            const res = await fetch(`/api/saving-goal/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: goal.name,
                    target: parseFloat(goal.target),
                    saved: parseFloat(goal.saved),
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Update failed");
            setSuccess(true);
            setTimeout(() => router.push("/saving-goal"), 1000);
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
                        onClick={() => router.push("/saving-goal")}
                        className="w-full text-[15px] text-emerald-700 dark:text-emerald-300 cursor-pointer hover:underline"
                    >
                        ← Back to Savings Goals
                    </p>
                    <h1 className="text-3xl font-bold text-center text-emerald-900 dark:text-emerald-200">
                        Edit Savings Goal
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-emerald-900 dark:text-emerald-200">
                                Goal Name
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                value={goal.name}
                                onChange={handleChange}
                                className="text-black dark:text-white bg-emerald-50 dark:bg-slate-800 border-none"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="target" className="text-emerald-900 dark:text-emerald-200">
                                Target Amount ($)
                            </Label>
                            <Input
                                id="target"
                                name="target"
                                type="number"
                                value={goal.target}
                                onChange={handleChange}
                                className="text-black dark:text-white bg-emerald-50 dark:bg-slate-800 border-none"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="saved" className="text-emerald-900 dark:text-emerald-200">
                                Amount Already Saved ($)
                            </Label>
                            <Input
                                id="saved"
                                name="saved"
                                type="number"
                                value={goal.saved}
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
                                Goal updated!
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
                                "Update Goal"
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}