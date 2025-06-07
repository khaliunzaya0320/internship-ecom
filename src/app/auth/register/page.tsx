import {Mail, Lock} from "lucide-react"

const RegisterPage = () => {
  return (
    <div className="">
      <h2 className="primary-header mb-6">Бүртгүүлэх</h2>

      <form action="" className="flex flex-col gap-4">
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

        <button type="submit" className="form-button">Бүртгүүлэх</button>
      </form>

      <div className="flex justify-center mt-4 gap-2">
          <p className="secondary-text">Бүртгэлтэй бол</p>
          <a href="/auth/login" className="underlined-button">Нэвтрэх</a>
      </div>

    </div>
  )
};

export default RegisterPage;

