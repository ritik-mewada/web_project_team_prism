"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                body: JSON.stringify(form),
                headers: { "Content-Type": "application/json" },
            });

            const data = await res.json();
            if (!res.ok) {
                setError(data.message || "Login failed");
                setLoading(false);
                return;
            }
            router.push("/dashboard");
        } catch (err) {
            console.log("LoginError", err);
            setError("Something went wrong. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-gray-50 to-blue-100">
            <Card className="w-full max-w-md p-6 bg-white shadow-2xl rounded-2xl animate-fade-in">
                <CardContent className="space-y-6">
                    <h1 className="text-3xl font-bold text-center text-gray-800">
                        Welcome Back
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-700">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                className="text-black bg-gray-100 border-none"
                                value={form.email}
                                onChange={(e) =>
                                    setForm({ ...form, email: e.target.value })
                                }
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-gray-700">
                                Password
                            </Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="pr-10 text-black bg-gray-100 border-none"
                                    value={form.password}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            password: e.target.value,
                                        })
                                    }
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute inset-y-0 flex items-center text-gray-500 right-3"
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <p className="text-sm text-red-600">{error}</p>
                        )}
                        {/* <Button className="w-full text-white transition-all bg-blue-600 hover:bg-blue-700">
                            Sign In
                        </Button> */}
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
                                    Signing in...
                                </div>
                            ) : (
                                "Sign In"
                            )}
                        </Button>

                        <p className="text-sm text-center text-gray-600">
                            Don’t have an account?{" "}
                            <Link
                                href="/register"
                                className="font-medium text-blue-600 hover:underline"
                            >
                                Register
                            </Link>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
