"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex items-center justify-center min-h-screen px-4 bg-muted">
            <Card className="w-full max-w-sm p-6 shadow-xl rounded-2xl">
                <CardContent className="space-y-6">
                    <h1 className="text-2xl font-semibold text-center">
                        Login
                    </h1>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 flex items-center text-sm text-gray-500 right-2"
                            >
                                {showPassword ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        </div>
                    </div>

                    <Button className="w-full text-white bg-black rounded-md hover:bg-gray-900">
                        Sign In
                    </Button>

                    <p className="text-sm text-center text-gray-600">
                        Don’t have an account?{" "}
                        <Link
                            href="/register"
                            className="font-medium text-primary hover:underline"
                        >
                            Register
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
