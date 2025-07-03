"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AddTransaction() {
    const [form, setForm] = useState({
        date: "",
        description: "",
        category: "",
        amount: "",
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);
        setError("");
        try {
            const res = await fetch("/api/transactions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...form,
                    amount: parseFloat(form.amount),
                }),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || "Failed to add transaction");
            }
            setSuccess(true);
            setForm({ date: "", description: "", category: "", amount: "" });
        } catch (err) {
            console.error(err);
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
                        onClick={() => router.push("/transaction")}
                        className="w-full text-[15px] text-blue-600 cursor-pointer"
                    >
                        ← Back to Transactions
                    </p>
                    <h1 className="text-3xl font-bold text-center text-gray-800">
                        Add Transaction
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="date" className="text-gray-700">
                                Date
                            </Label>
                            <Input
                                id="date"
                                type="date"
                                name="date"
                                className="text-black bg-gray-100 border-none"
                                value={form.date}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label
                                htmlFor="description"
                                className="text-gray-700"
                            >
                                Description
                            </Label>
                            <Input
                                id="description"
                                type="text"
                                name="description"
                                placeholder="e.g., Grocery shopping"
                                className="text-black bg-gray-100 border-none"
                                value={form.description}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category" className="text-gray-700">
                                Category
                            </Label>
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
                                <option value="Salary">Salary</option>
                                <option value="Entertainment">
                                    Entertainment
                                </option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="amount" className="text-gray-700">
                                Amount ($)
                            </Label>
                            <Input
                                id="amount"
                                type="number"
                                name="amount"
                                placeholder="e.g., 120"
                                className="text-black bg-gray-100 border-none"
                                value={form.amount}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {success && (
                            <p className="text-sm text-green-600">
                                ✅ Transaction saved!
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
                                "Save Transaction"
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

// export default function AddTransaction() {
//     const [form, setForm] = useState({
//         date: "",
//         description: "",
//         category: "",
//         amount: "",
//     });

//     const handleChange = (
//         e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//     ) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         console.log("Submitted Transaction:", form);
//         // TODO: send to API or DB
//     };

//     return (
//         <div className="flex items-center justify-center min-h-screen px-4 py-8 text-gray-800 bg-gradient-to-br from-gray-50 to-blue-100">
//             <div className="w-full max-w-lg p-8 bg-white shadow-2xl rounded-2xl animate-fade-in">
//                 <h2 className="mb-6 text-2xl font-bold text-center">
//                     Add New Transaction
//                 </h2>

//                 <form onSubmit={handleSubmit} className="space-y-5">
//                     <div>
//                         <label
//                             htmlFor="date"
//                             className="block mb-1 text-sm font-medium text-gray-700"
//                         >
//                             Date
//                         </label>
//                         <input
//                             type="date"
//                             name="date"
//                             id="date"
//                             value={form.date}
//                             onChange={handleChange}
//                             className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                             required
//                         />
//                     </div>

//                     <div>
//                         <label
//                             htmlFor="description"
//                             className="block mb-1 text-sm font-medium text-gray-700"
//                         >
//                             Description
//                         </label>
//                         <input
//                             type="text"
//                             name="description"
//                             id="description"
//                             placeholder="e.g., Grocery shopping"
//                             value={form.description}
//                             onChange={handleChange}
//                             className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                             required
//                         />
//                     </div>

//                     <div>
//                         <label
//                             htmlFor="category"
//                             className="block mb-1 text-sm font-medium text-gray-700"
//                         >
//                             Category
//                         </label>
//                         <select
//                             name="category"
//                             id="category"
//                             value={form.category}
//                             onChange={handleChange}
//                             className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                             required
//                         >
//                             <option value="">Select Category</option>
//                             <option value="Groceries">Groceries</option>
//                             <option value="Rent">Rent</option>
//                             <option value="Utilities">Utilities</option>
//                             <option value="Salary">Salary</option>
//                             <option value="Entertainment">Entertainment</option>
//                         </select>
//                     </div>

//                     <div>
//                         <label
//                             htmlFor="amount"
//                             className="block mb-1 text-sm font-medium text-gray-700"
//                         >
//                             Amount ($)
//                         </label>
//                         <input
//                             type="number"
//                             name="amount"
//                             id="amount"
//                             placeholder="e.g., 150"
//                             value={form.amount}
//                             onChange={handleChange}
//                             className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                             required
//                         />
//                     </div>

//                     <button
//                         type="submit"
//                         className="w-full py-3 font-semibold text-white transition duration-200 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700"
//                     >
//                         Save Transaction
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// 'use client';

// import { useState } from 'react';

// export default function AddTransaction() {
//   const [form, setForm] = useState({
//     date: '',
//     description: '',
//     category: '',
//     amount: ''
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log('Submitted Transaction:', form);
//     // TODO: send to API or DB
//   };

//   return (
//     <div className="min-h-screen p-8 text-gray-800 bg-gray-50">
//       <h2 className="mb-4 text-xl font-semibold">Add Transaction</h2>
//       <form onSubmit={handleSubmit} className="max-w-md p-6 space-y-4 bg-white rounded shadow">
//         <input
//           type="date"
//           name="date"
//           value={form.date}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <input
//           type="text"
//           name="description"
//           placeholder="Description"
//           value={form.description}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <select
//           name="category"
//           value={form.category}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         >
//           <option value="">Select Category</option>
//           <option value="Groceries">Groceries</option>
//           <option value="Rent">Rent</option>
//           <option value="Utilities">Utilities</option>
//           <option value="Salary">Salary</option>
//         </select>
//         <input
//           type="number"
//           name="amount"
//           placeholder="Amount"
//           value={form.amount}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <button
//           type="submit"
//           className="px-4 py-2 text-white bg-blue-600 rounded shadow hover:bg-blue-700"
//         >
//           Save Transaction
//         </button>
//       </form>
//     </div>
//   );
// }
