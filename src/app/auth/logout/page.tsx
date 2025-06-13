"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        console.log("=== LOGOUT PROCESS ===");
        
        // Clear all browser storage
        if (typeof window !== 'undefined') {
          localStorage.clear();
          sessionStorage.clear();
          
          // Clear NextAuth session
          await signOut({ 
            redirect: false,
            callbackUrl: "/auth/login" 
          });
          
          console.log("Session cleared, redirecting to login");
        }
        
        router.push("/auth/login");
      } catch (error) {
        console.error("Системээс гарах үед алдаа гарлаа:", error);
        router.push("/auth/login");
      }
    };

    handleLogout();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <div className="mb-4">
          <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
        <h1 className="text-xl font-semibold mb-2">Системээс гарч байна...</h1>
        <p className="text-gray-500">Түр хүлээнэ үү.</p>
      </div>
    </div>
  );
}
