import Link from "next/link";

const SideMenu = () => {
  return (
    <div className="min-w-56 min-h-screen bg-white p-6 rounded shadow-sm border-gray-200">

        <nav className="flex flex-col space-y-2">
          <Link href="/shop/account/profile" className="side-menu-button">
            Хувийн мэдээлэл
          </Link>
          <Link href="/shop/account/wishlist" className="side-menu-button">
            Хадгалсан
          </Link>
          <Link href="/shop/account/order" className="side-menu-button">
            Захиалга
          </Link>
          <Link href="/auth/logout" className="side-menu-button">
            Системээс гарах
          </Link>
        </nav>

    </div>
  )
}

export default SideMenu;