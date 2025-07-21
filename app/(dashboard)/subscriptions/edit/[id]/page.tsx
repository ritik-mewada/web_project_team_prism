"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function EditSubscription() {
    const { id } = useParams();
    const router = useRouter();
    const [form, setForm] = useState({
        service: "",
        amount: "",
        frequency: "",
        status: "Active",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        async function fetchSubscription() {
            try {
                const res = await fetch(`/api/subscription/${id}`);
                const data = await res.json();
                if (!res.ok) throw new Error(data.message || "Not found");
                setForm({
                    service: data.subscription.service,
                    amount: data.subscription.amount.toString(),
                    frequency: data.subscription.frequency,
                    status: data.subscription.status,
                });
            } catch (err: any) {
                setError(err.message);
            }
        }
        fetchSubscription();
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
            const res = await fetch(`/api/subscription/${id}`, {
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
        <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-emerald-100 to-slate-200 dark:from-emerald-900 dark:to-slate-800">
            <Card className="w-full max-w-md p-6 bg-white dark:bg-slate-900 shadow-2xl rounded-2xl animate-fade-in border border-emerald-100 dark:border-emerald-900">
                <CardContent className="space-y-6">
                    <p
                        onClick={() => router.push("/subscriptions")}
                        className="w-full text-[15px] text-emerald-700 dark:text-emerald-300 cursor-pointer hover:underline"
                    >
                        ← Back to Subscriptions
                    </p>
                    <h1 className="text-3xl font-bold text-center text-emerald-900 dark:text-emerald-200">
                        Edit Subscription
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="service" className="text-emerald-900 dark:text-emerald-200">
                                Service
                            </Label>
                            <Input
                                id="service"
                                name="service"
                                value={form.service}
                                onChange={handleChange}
                                className="text-black dark:text-white bg-emerald-50 dark:bg-slate-800 border-none"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="amount" className="text-emerald-900 dark:text-emerald-200">
                                Amount
                            </Label>
                            <Input
                                id="amount"
                                name="amount"
                                type="number"
                                value={form.amount}
                                onChange={handleChange}
                                className="text-black dark:text-white bg-emerald-50 dark:bg-slate-800 border-none"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="frequency" className="text-emerald-900 dark:text-emerald-200">
                                Frequency
                            </Label>
                            <select
                                id="frequency"
                                name="frequency"
                                value={form.frequency}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-black dark:text-white bg-emerald-50 dark:bg-slate-800 border-none rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                required
                            >
                                <option value="">Select</option>
                                <option value="Monthly">Monthly</option>
                                <option value="Yearly">Yearly</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="status" className="text-emerald-900 dark:text-emerald-200">
                                Status
                            </Label>
                            <select
                                id="status"
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-black dark:text-white bg-emerald-50 dark:bg-slate-800 border-none rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                required
                            >
                                <option value="Active">Active</option>
                                <option value="Paused">Paused</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>

                        {error && (
                            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                        )}
                        {success && (
                            <p className="text-sm text-green-600 dark:text-green-400">
                                Subscription updated successfully!
                            </p>
                        )}

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full text-white bg-emerald-600 hover:bg-emerald-700 transition-all font-semibold rounded-lg shadow-md disabled:opacity-70"
                        >
                            {loading ? "Updating..." : "Update Subscription"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}