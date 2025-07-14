"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Debt {
  _id: string;
  type: string;
  amount: number;
  dueDate: string;
}

export default function DebtsPage() {
  const [debts, setDebts] = useState<Debt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchDebts() {
      try {
        const res = await fetch("/api/debts");
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to load");
        setDebts(data.debts);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchDebts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this debt?")) return;
    const res = await fetch(`/api/debts/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (res.ok) {
      setDebts((prev) => prev.filter((d) => d._id !== id));
    } else {
      alert(data.message || "Delete failed");
    }
  };

  return (
    <div className="flex min-h-screen px-4 py-8 text-gray-800 bg-gradient-to-br from-gray-50 to-blue-100">
      <main className="flex-1 max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Debts</h2>
          <Link href="/debts/add">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded shadow">
              + Add Debt
            </button>
          </Link>
        </div>

        <div className="p-6 bg-white shadow-xl rounded-xl animate-fade-in">
          <h3 className="mb-4 text-lg font-semibold">Debt Overview</h3>
          {loading && <p>Loading...</p>}
          {/* {error && <p className="text-red-600">{error}</p>} */}
          {!loading && debts.length === 0 && (
            <p className="text-gray-500">No debts found.</p>
          )}
          {debts.length > 0 && (
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-gray-600 border-b">
                  <th className="pb-2">Type</th>
                  <th className="pb-2">Due Date</th>
                  <th className="pb-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {debts.map((d) => (
                  <tr key={d._id} className="border-t hover:bg-gray-50">
                    <td className="py-3">{d.type}</td>
                    <td>{d.dueDate}</td>
                    <td className="text-right">
                      ${d.amount.toFixed(2)}
                      <div className="flex justify-end gap-2 mt-1">
                        <button
                          onClick={() => router.push(`/debts/edit/${d._id}`)}
                          className="text-sm text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(d._id)}
                          className="text-sm text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
