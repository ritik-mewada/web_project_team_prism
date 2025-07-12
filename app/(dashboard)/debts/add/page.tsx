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
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-br from-gray-50 to-blue-100">
      <Card className="w-full max-w-md p-6 bg-white shadow-2xl rounded-2xl animate-fade-in">
        <CardContent className="space-y-6">
          <p
            onClick={() => router.push("/debts")}
            className="self-start text-[15px] w-full max-w-md mb-4 text-blue-600 cursor-pointer hover:underline"
          >
            ← Back to Debts
          </p>
          <h1 className="text-3xl font-bold text-center text-gray-800">
            Add Debt
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="type">Debt Type</Label>
              <select
                id="type"
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full px-3 py-2 text-black bg-gray-100 border-none rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="">Select Type</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Loan">Loan</option>
                <option value="Line of Credit">Line of Credit</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                placeholder="e.g., 5000"
                value={form.amount}
                onChange={handleChange}
                className="text-black bg-gray-100 border-none"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                name="dueDate"
                type="date"
                value={form.dueDate}
                onChange={handleChange}
                className="text-black bg-gray-100 border-none"
                required
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}
            {success && (
              <p className="text-sm text-green-600">
                Debt added successfully!
              </p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-70"
            >
              {loading ? "Saving..." : "Save Debt"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
