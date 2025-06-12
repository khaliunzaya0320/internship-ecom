"use client";

import { Mail, Lock } from "lucide-react";
import { useState } from "react";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setError("");
    setSuccess("");

    const res = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Алдаа гарлаа");
    } else {
      setSuccess("Амжилттай бүртгэгдлээ!");
      setEmail("");
      setPassword("");
      setName("");
    }
  };

  return (
    <div>
      <h2 className="primary-header mb-6">Бүртгүүлэх</h2>

      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        {/* <input
          type="text"
          placeholder="Нэр"
          className="form-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        /> */}

        <div className="relative">
          <Mail className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400 w-4 h-4" />
          <input
            type="email"
            placeholder="Имэйл"
            className="form-input pl-10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="relative">
          <Lock className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400 w-4 h-4" />
          <input
            type="password"
            placeholder="Нууц үг"
            className="form-input pl-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="form-button">
          Бүртгүүлэх
        </button>

        {error && <p className="text-red-600 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}
      </form>

      <div className="flex justify-center mt-4 gap-2">
        <p className="secondary-text">Бүртгэлтэй бол</p>
        <a href="/auth/login" className="underlined-button">
          Нэвтрэх
        </a>
      </div>
    </div>
  );
};

export default RegisterPage;
