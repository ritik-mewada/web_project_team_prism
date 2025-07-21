"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function AccountPage() {
    const [user, setUser] = useState<{
        username: string;
        email: string;
    } | null>(null);
    const [newUsername, setNewUsername] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch("/api/auth/me");
            const data = await res.json();
            if (res.ok) {
                setUser(data.user);
                setNewUsername(data.user.username);
            }
        };
        fetchUser();
    }, []);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch("/api/user/update", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: newUsername }),
        });

        const data = await res.json();
        setMessage(data.message || "Update failed");

        if (res.ok && user) {
            setUser({ ...user, username: newUsername });
        }
    };

    if (!user)
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-100 to-slate-200 dark:from-emerald-900 dark:to-slate-800">
                <p className="text-lg text-gray-500">Loading...</p>
            </div>
        );

    return (
        <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-emerald-100 to-slate-200 dark:from-emerald-900 dark:to-slate-800">
            <Card className="w-full max-w-md p-6 bg-white dark:bg-slate-900 shadow-2xl rounded-2xl animate-fade-in border border-emerald-100 dark:border-emerald-900">
                <CardContent className="space-y-6">
                    <h2 className="text-3xl font-bold text-center text-emerald-900 dark:text-emerald-200 mb-4">
                        Account Information
                    </h2>
                    <form onSubmit={handleUpdate} className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-emerald-900 dark:text-emerald-200">Email</Label>
                            <Input
                                type="text"
                                value={user.email}
                                disabled
                                className="text-gray-600 bg-emerald-50 dark:bg-slate-800 border-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-emerald-900 dark:text-emerald-200">Username</Label>
                            <Input
                                type="text"
                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value)}
                                className="text-black dark:text-white bg-emerald-50 dark:bg-slate-800 border-none"
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full text-white bg-emerald-600 hover:bg-emerald-700 transition-all font-semibold rounded-lg shadow-md"
                        >
                            Update
                        </Button>
                        {message && (
                            <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-300">
                                {message}
                            </p>
                        )}
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}