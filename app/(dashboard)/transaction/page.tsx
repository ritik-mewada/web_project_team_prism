"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Transaction {
    _id: string;
    date: string;
    description: string;
    category: string;
    amount: string;
}

export default function Page() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        async function fetchTransactions() {
            try {
                const res = await fetch("/api/transactions");
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(
                        data.message || "failed to load transactions"
                    );
                }

                setTransactions(data.transactions);
            } catch (err) {
                console.log("FETCH ERROR", err);
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        }
        fetchTransactions();
    }, []);
    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this transaction?"))
            return;
        try {
            const res = await fetch(`/api/transactions/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                const data = await res.json();
                alert(data.message || "Failed to delete");
                return;
            }

            // Refresh list
            setTransactions(transactions.filter((t) => t._id !== id));
        } catch (err) {
            console.error(err);
            alert("Error deleting transaction");
        }
    };

    const handleEdit = (transaction: Transaction) => {
        // Option 1: Redirect to edit page with ID
        router.push(`/transaction/edit/${transaction._id}`);

        // Option 2: Show inline form/modal (let me know if you want this)
    };

    return (
        <div className="flex min-h-screen px-4 py-8 text-gray-800 bg-gradient-to-br from-gray-50 to-blue-100">
            <main className="flex-1 max-w-5xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Transactions
                    </h2>
                    <Link href="/transaction/add">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow-md transition duration-200">
                            + Add Transaction
                        </button>
                    </Link>
                </div>

                <div className="p-6 overflow-x-auto bg-white shadow-2xl rounded-2xl animate-fade-in">
                    <h3 className="mb-4 text-lg font-semibold text-gray-700">
                        All Transactions
                    </h3>

                    {loading && <p className="text-gray-500">Loading...</p>}
                    {error && <p className="text-red-600">{error}</p>}

                    {!loading && !error && (
                        <table className="w-full text-sm text-left">
                            <thead>
                                <tr className="text-gray-600 border-b">
                                    <th className="pb-2">Date</th>
                                    <th className="pb-2">Description</th>
                                    <th className="pb-2">Category</th>
                                    <th className="pb-2 text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="py-4 text-center text-gray-500"
                                        >
                                            No transactions found.
                                        </td>
                                    </tr>
                                ) : (
                                    transactions.map((t) => (
                                        <tr
                                            key={t._id}
                                            className="text-gray-800 transition border-t rounded hover:bg-gray-50"
                                        >
                                            <td className="py-3">
                                                {new Date(
                                                    t.date
                                                ).toLocaleDateString()}
                                            </td>
                                            <td>{t.description}</td>
                                            <td>{t.category}</td>
                                            <td className="text-right">
                                                ${t.amount.toFixed(2)}
                                            </td>
                                            <td className="text-right">
                                                ${t.amount.toFixed(2)}
                                                <div className="flex justify-end gap-2 mt-1">
                                                    <button
                                                        onClick={() =>
                                                            handleEdit(t)
                                                        }
                                                        className="text-sm text-blue-600 hover:underline"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(t._id)
                                                        }
                                                        className="text-sm text-red-600 hover:underline"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </main>
        </div>
    );
}

// 'use client';

// export default function Page() {
//   return (
//     <div className="flex min-h-screen text-gray-800 bg-gray-50">
//       <main className="flex-1 p-8 space-y-6">
//         <div className="flex items-center justify-between">
//           <h2 className="text-xl font-semibold">Transactions</h2>
//           <a href="/transaction/add">
//             <button className="px-4 py-2 text-white transition duration-200 bg-blue-600 rounded-lg shadow hover:bg-blue-700">
//               + Add Transaction
//             </button>
//           </a>
//         </div>

//         <div className="p-4 bg-white rounded shadow">
//           <h3 className="mb-4 font-semibold">All Transactions</h3>
//           <table className="w-full text-sm text-left">
//             <thead>
//               <tr className="text-gray-600 border-b">
//                 <th className="pb-2">Date</th>
//                 <th className="pb-2">Description</th>
//                 <th className="pb-2">Category</th>
//                 <th className="pb-2 text-right">Amount</th>
//               </tr>
//             </thead>
//             <tbody>
//               {[
//                 { date: 'Apr 18, 2024', desc: 'Groceries', cat: 'Groceries', amt: '$100.00' },
//                 { date: 'Apr 15, 2024', desc: 'Salary', cat: 'Salary', amt: '$3,000.00' },
//                 { date: 'Apr 10, 2024', desc: 'Utilities', cat: 'Utilities', amt: '$75.00' },
//                 { date: 'Apr 05, 2024', desc: 'Rent', cat: 'Rent', amt: '$100.00' },
//                 { date: 'Apr 01, 2024', desc: '-', cat: '-', amt: '$1,200.00' },
//               ].map((t, i) => (
//                 <tr key={i} className="text-gray-800 border-t">
//                   <td className="py-2">{t.date}</td>
//                   <td>{t.desc}</td>
//                   <td>{t.cat}</td>
//                   <td className="text-right">{t.amt}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </main>
//     </div>
//   );
// }
