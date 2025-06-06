import Link from "next/link";

const LogoutPage = () => {

  return (

    <div>
      <h2 className="primary-header">Системээс гарсан байна</h2>
      <Link href="/auth/login" className="form-button"> 
        <button>Нэвтрэх</button>
      </Link>

    </div>
  )
};

export default LogoutPage;
