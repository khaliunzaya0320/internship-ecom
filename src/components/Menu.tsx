import Link from "next/link";
import {Bell, Heart, ShoppingCart, User} from "lucide-react";

const Menu = () => {
  return(
    <nav className="flex gap-6 text-sm font-medium items-center ">
      
      <Link href="/shop/notification" className="navbar-menu hover:text-rose-500">
        <Bell className="menu-icon"/>
        <span>Мэдэгдэл</span> 
      </Link>
      <Link href="/shop/account/wishlist" className="navbar-menu hover:text-rose-500">
        <Heart className="menu-icon"/>
        <span>Хадгалсан</span>
      </Link>
      <Link href="/shop/cart" className="navbar-menu hover:text-rose-500">
        <ShoppingCart className="menu-icon"/>
        <span>Сагс</span>
      </Link>
      <Link href="/shop/account" className="navbar-menu hover:text-rose-500">
        <User className="menu-icon"/>
        <span>Account</span> 
      </Link>

    </nav>
  )
}

export default Menu;