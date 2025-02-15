"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    debugger;

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    console.log("login response: ", res);
    const data = await res.json();
    console.log("data fetch in login page: ", data);
    if (!res?.ok) {
      setError(data.error || "Login failed");
      return;
    }

    // Then call NextAuth signIn() to create a session
    const nextAuthRes = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    console.log("login page session signin: ", nextAuthRes);
    if (nextAuthRes?.error) {
      setError(nextAuthRes.error);
      return;
    }
    // 🔹 Manually force a session refresh
    const sessionRes = await fetch("/api/auth/session");
    const sessionData = await sessionRes.json();
    console.log("Updated Session Data:", sessionData);

    window.location.href = "/";
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border text-black rounded"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border text-black rounded"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
