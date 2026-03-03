"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Lock, Mail, Loader2, ArrowRight, LayoutGrid } from "lucide-react";
import { toast } from "sonner";
import { authAPI } from "@/lib/userApi";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authAPI.login(formData);
      toast.success("Welcome back!");
      router.push("/");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const modules = ["Inventory", "Chat", "Meetings", "Requisitions"];

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex w-[45%] bg-blue-600 flex-col justify-between p-12 relative overflow-hidden">
        {/* Background grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Logo */}
        <div className="relative flex items-center gap-2.5">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <LayoutGrid className="h-4 w-4 text-white" />
          </div>
          <span className="text-white font-bold text-sm tracking-wide">
            ERP Tools
          </span>
        </div>

        {/* Center content */}
        <div className="relative">
          <p className="text-blue-200 text-xs uppercase tracking-widest font-semibold mb-3">
            Enterprise Resource Planning
          </p>
          <h2 className="text-white text-4xl font-bold leading-tight tracking-tight mb-6">
            One platform.
            <br />
            Every operation.
          </h2>

          {/* Module pills */}
          <div className="flex flex-wrap gap-2">
            {modules.map((mod) => (
              <span
                key={mod}
                className="text-xs text-white/80 bg-white/10 border border-white/20 rounded-full px-3 py-1"
              >
                {mod}
              </span>
            ))}
          </div>
        </div>

        <p className="relative text-blue-300 text-xs"></p>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 p-8">
        {/* Mobile logo */}
        <div className="flex items-center gap-2 mb-10 lg:hidden">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
            <LayoutGrid className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="text-gray-900 font-bold text-sm">ERP Tools</span>
        </div>

        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Sign in
            </h1>
            <p className="text-sm text-gray-500 mt-1">Access your workspace</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  className="pl-9 h-10 bg-white border-gray-200 focus-visible:ring-blue-500"
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-blue-600 hover:text-blue-700"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-9 h-10 bg-white border-gray-200 focus-visible:ring-blue-500"
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white font-medium"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Sign in <ArrowRight className="ml-1.5 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <p className="text-sm text-gray-500 text-center mt-6">
            Don't have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-blue-600 font-medium hover:text-blue-700"
            >
              Request access
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
