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
                console.log("Data", data);
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

    const handleChange = (e) => {
        setGoal({ ...goal, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
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
            router.push("/saving-goal");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-gray-50 to-blue-100">
            <Card className="w-full max-w-md p-6 bg-white shadow-2xl rounded-2xl">
                <CardContent className="space-y-6">
                    <h1 className="text-3xl font-bold text-center text-gray-800">
                        Edit Savings Goal
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-gray-700">
                                Goal Name
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                value={goal.name}
                                onChange={handleChange}
                                className="text-black bg-gray-100 border-none"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="target" className="text-gray-700">
                                Target Amount ($)
                            </Label>
                            <Input
                                id="target"
                                name="target"
                                type="number"
                                value={goal.target}
                                onChange={handleChange}
                                className="text-black bg-gray-100 border-none"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="saved" className="text-gray-700">
                                Amount Already Saved ($)
                            </Label>
                            <Input
                                id="saved"
                                name="saved"
                                type="number"
                                value={goal.saved}
                                onChange={handleChange}
                                className="text-black bg-gray-100 border-none"
                                required
                            />
                        </div>
                        {error && (
                            <p className="text-sm text-red-600">{error}</p>
                        )}
                        {success && (
                            <p className="text-sm text-green-600">
                                Goal updated!
                            </p>
                        )}
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full text-white transition-all bg-blue-600 hover:bg-blue-700 disabled:opacity-70`"
                        >
                            {loading ? "Saving..." : "Update Goal"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
