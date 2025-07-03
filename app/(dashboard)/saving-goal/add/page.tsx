"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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
            console.log(err);
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-gray-50 to-blue-100">
            <Card className="w-full max-w-md p-6 bg-white shadow-2xl rounded-2xl animate-fade-in">
                <CardContent className="space-y-6">
                    <p
                        onClick={() => router.push("/saving-goal")}
                        className="w-full text-[15px] text-blue-600 cursor-pointer"
                    >
                        ← Back to Transactions
                    </p>
                    <h1 className="text-3xl font-bold text-center text-gray-800">
                        Add Savings Goal
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-gray-700">
                                Goal Name
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="e.g., Tuition Fees"
                                className="text-black bg-gray-100 border-none"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="target" className="text-gray-700">
                                Target Amount ($)
                            </Label>
                            <Input
                                id="target"
                                type="number"
                                name="target"
                                placeholder="e.g., 5000"
                                className="text-black bg-gray-100 border-none"
                                value={form.target}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="saved" className="text-gray-700">
                                Amount Already Saved ($)
                            </Label>
                            <Input
                                id="saved"
                                type="number"
                                name="saved"
                                placeholder="e.g., 1500"
                                className="text-black bg-gray-100 border-none"
                                value={form.saved}
                                onChange={handleChange}
                            />
                        </div>

                        {success && (
                            <p className="text-sm text-green-600">
                                ✅ Goal saved!
                            </p>
                        )}

                        {error && (
                            <p className="text-sm text-red-600">{error}</p>
                        )}

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full text-white transition-all bg-blue-600 hover:bg-blue-700 disabled:opacity-70"
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

// "use client";

// import { useState } from "react";

// export default function AddSavingGoal() {
//     const [goal, setGoal] = useState({
//         name: "",
//         target: "",
//         saved: "",
//     });

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setGoal({ ...goal, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         console.log("Submitted Saving Goal:", goal);
//         // TODO: send to API or DB
//     };

//     return (
//         <div className="min-h-screen p-8 text-gray-800 bg-gray-50">
//             <h2 className="mb-4 text-xl font-semibold">Add Savings Goal</h2>
//             <form
//                 onSubmit={handleSubmit}
//                 className="max-w-md p-6 space-y-4 bg-white rounded shadow"
//             >
//                 <input
//                     type="text"
//                     name="name"
//                     placeholder="Goal Name"
//                     value={goal.name}
//                     onChange={handleChange}
//                     className="w-full p-2 border rounded"
//                     required
//                 />
//                 <input
//                     type="number"
//                     name="target"
//                     placeholder="Target Amount"
//                     value={goal.target}
//                     onChange={handleChange}
//                     className="w-full p-2 border rounded"
//                     required
//                 />
//                 <input
//                     type="number"
//                     name="saved"
//                     placeholder="Amount Already Saved"
//                     value={goal.saved}
//                     onChange={handleChange}
//                     className="w-full p-2 border rounded"
//                 />
//                 <button
//                     type="submit"
//                     className="px-4 py-2 text-white bg-blue-600 rounded shadow hover:bg-blue-700"
//                 >
//                     Save Goal
//                 </button>
//             </form>
//         </div>
//     );
// }
