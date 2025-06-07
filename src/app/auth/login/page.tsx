"use client"
import { useRouter } from "next/navigation";
import { Mail, Lock } from "lucide-react"; 

const LoginPage = () => {

  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
      router.push("/shop")
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-sm">
      <h2 className="primary-header text-center mb-6">Нэвтрэх</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="relative">
          <Mail className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400 w-4 h-4" />
          <input
            type="email"
            placeholder="Имэйл"
            className="form-input pl-10"
            required
          />
        </div>

        <div className="relative">
          <Lock className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400 w-4 h-4" />
          <input
            type="password"
            placeholder="Нууц үг"
            className="form-input pl-10"
            required
          />
        </div>

        <button type="submit" className="form-button mt-2">
          Нэвтрэх
        </button>
      </form>

      <div className="flex justify-center mt-6 gap-2 text-sm">
        <p className="text-gray-600">Шинэ хэрэглэгч үү?</p>
        <a href="/auth/register" className="underlined-button text-blue-600">
          Бүртгүүлэх
        </a>
      </div>

      <p className="text-center text-sm text-gray-400 mt-6">эсвэл</p>

      <div className="flex flex-col gap-2 mt-4">
        <button type="button" className="next-auth-button flex items-center justify-center gap-2">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png" alt="G" className="w-5 h-5" />
          <span>Google-ээр нэвтрэх</span>
        </button>
        <button type="button" className="next-auth-button flex items-center justify-center gap-2">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjvzC_QRv6moAhgNb5C6e3yicKgFND1g2RwA&s" alt="G" className="w-5 h-5" />
          <span>Facebook-ээр нэвтрэх</span>
        </button>
      </div>
    </div>
  );

};

export default LoginPage;
