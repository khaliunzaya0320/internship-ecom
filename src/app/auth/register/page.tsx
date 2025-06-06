const RegisterPage = () => {
  return (
    <div className="">

      <h2 className="primary-header">Бүртгүүлэх</h2>

      <form action="" className="flex flex-col gap-4">
        <input type="email" placeholder="Имэйл" className="form-input"/>
        <input type="password" placeholder="Нууц үг" className="form-input"/>
        <button type="submit" className="form-button">Бүртгүүлэх</button>
      </form>

      <div className="flex justify-center m-4 gap-2">
          <p>Бүртгэлтэй бол</p>
          <a href="/auth/login" className="underlined-button">Нэвтрэх</a>
      </div>

    </div>
  )
};

export default RegisterPage;

