"use client"
import { useRouter } from "next/navigation";

const LoginPage = () => {

  const router = useRouter()
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
      router.push("/shop")
  }

  return (
    <div className="">

      <h2 className="primary-header">Нэвтрэх</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="email" placeholder="Имэйл" className="form-input"/>
        <input type="password" placeholder="Нууц үг" className="form-input"/>
        <button type="submit" className="form-button">Нэвтрэх</button>
      </form>

      <div className="flex justify-center m-4 gap-2">
          <p>Шинэ хэрэглэгч болох</p>
          <a href="/auth/register" className="underlined-button">Бүртгүүлэх</a>
      </div>

      <p className="">эсвэл</p>

      <div className="flex flex-col">
        <button type="button" className="form-button">
          <span>Gmail-ээр нэвтрэх</span>
        </button>
        <button type="button" className="form-button">
          <span>Facebook-ээр нэвтрэх</span>
        </button>
      </div>
      
    </div>
  )

};

export default LoginPage;
