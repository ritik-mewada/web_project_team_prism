"use client";

import { useEffect, useState } from "react";

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
            console.log(data);
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

    if (!user) return <p className="p-4">Loading...</p>;

    return (
        <div className="min-h-screen p-8 text-gray-800 bg-gray-50">
            <h2 className="mb-4 text-xl font-semibold">Account Information</h2>
            <form
                onSubmit={handleUpdate}
                className="max-w-md p-6 space-y-4 bg-white rounded shadow"
            >
                <div>
                    <label className="block mb-1 text-sm font-medium">
                        Email
                    </label>
                    <input
                        type="text"
                        value={user.email}
                        disabled
                        className="w-full p-2 text-gray-600 bg-gray-100 border rounded"
                    />
                </div>

                <div>
                    <label className="block mb-1 text-sm font-medium">
                        Username
                    </label>
                    <input
                        type="text"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        className="w-full p-2 text-black bg-gray-100 border rounded"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-600 rounded shadow hover:bg-blue-700"
                >
                    Update
                </button>

                {message && (
                    <p className="mt-2 text-sm text-center text-gray-600">
                        {message}
                    </p>
                )}
            </form>
        </div>
    );
}
