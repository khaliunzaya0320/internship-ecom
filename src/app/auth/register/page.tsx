"use client";

import { Mail, Lock, User } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setError("");
    setSuccess("");    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();    if (!res.ok) {
      setError(data.error || "Алдаа гарлаа");
    } else {
      setSuccess("Амжилттай бүртгэгдлээ!");
      setEmail("");
      setPassword("");
      setName("");
      
      // Toast message харуулаад login хуудасруу шилжүүлэх
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    }
  };  return (
    <div>
      <h2 className="primary-header mb-6">Бүртгүүлэх</h2><form onSubmit={handleRegister} className="flex flex-col gap-4">        <div className="relative">
          <User className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Нэр"
            className="form-input pl-10"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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
        </button>        {error && <p className="text-red-600 text-sm">{error}</p>}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative text-sm">
            <strong className="font-bold">Амжилттай!</strong>
            <span className="block sm:inline"> {success} 2 секундын дараа нэвтрэх хуудасруу шилжих болно...</span>
          </div>
        )}
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
