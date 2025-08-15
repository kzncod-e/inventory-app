"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUser, registerUser } from "@/lib/user";

import { useRouter } from "next/navigation";
import { log } from "console";

export default function LoginPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginUser(name, password); // pakai await

      router.push("/");
    } catch (error: any) {
      console.log("Error during login:", error.message);
    }
  };

  return (
    <div className="min-h-screen neon-gradient-bg flex items-center justify-center p-4">
      {/* Animated background overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Login form container */}
      <div className="relative z-10 w-full max-w-md">
        <div className="glassmorphism rounded-2xl p-8 shadow-2xl">
          {/* Web3 Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0L1.608 6v12L12 24l10.392-6V6L12 0zm0 4.5L18.5 8v8L12 19.5 5.5 16V8L12 4.5z" />
                <path d="M12 6.75L8.25 9v6L12 17.25 15.75 15V9L12 6.75z" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1
              className="text-3xl font-bold text-white mb-2"
              style={{ fontFamily: "var(--font-orbitron)" }}>
              Ray Inventory
            </h1>
            <p
              className="text-gray-300"
              style={{ fontFamily: "var(--font-exo)" }}>
              Access the decentralized future
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-gray-200 font-medium"
                style={{ fontFamily: "var(--font-exo)" }}>
                username
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="glow-input bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500/50 rounded-lg h-12"
                placeholder="Enter your email"
                required
                style={{ fontFamily: "var(--font-exo)" }}
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-gray-200 font-medium"
                style={{ fontFamily: "var(--font-exo)" }}>
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="glow-input bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500/50 rounded-lg h-12"
                placeholder="Enter your password"
                required
                style={{ fontFamily: "var(--font-exo)" }}
              />
            </div>

            <Button
              type="submit"
              className="futuristic-button w-full h-12 text-white font-semibold rounded-lg shadow-lg"
              style={{ fontFamily: "var(--font-orbitron)" }}>
              Login
            </Button>
          </form>

          {/* Footer links */}
          <div className="mt-8 text-center space-y-2">
            <a
              href="#"
              className="text-gray-300 hover:text-purple-400 transition-colors text-sm"
              style={{ fontFamily: "var(--font-exo)" }}></a>
            <div
              className="text-gray-400 text-sm"
              style={{ fontFamily: "var(--font-exo)" }}>
              don't have an account?{" "}
              <a
                href="/signup"
                className="text-purple-400 hover:text-purple-300 transition-colors">
                Sign up
              </a>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-purple-500/30 rounded-full blur-sm" />
        <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-blue-500/30 rounded-full blur-sm" />
        <div className="absolute top-1/2 -right-8 w-6 h-6 bg-purple-400/40 rounded-full blur-sm" />
      </div>
    </div>
  );
}
