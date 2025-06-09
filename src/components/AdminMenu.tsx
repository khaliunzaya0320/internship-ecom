"use client"
import Link from "next/link";
import { List, UserPen, LogOut, Cuboid } from "lucide-react";
import { usePathname } from "next/navigation";


const AdminMenu = () => {

  const pathname = usePathname();  
  const sideMenuItems = [
    { href: "/admin/product", label: "Бүтээгдэхүүн", icon: <List className="menu-icon" /> },
    { href: "/admin/orders", label: "Захиалга", icon: <Cuboid className="menu-icon" /> },
    { href: "/admin/users", label: "Хэрэглэгч", icon: <UserPen className="menu-icon" /> },
    { href: "/admin/auth/logout", label: "Системээс гарах", icon: <LogOut className="menu-icon" /> },
  ];

  return (

    <div className="flex flex-col h-screen gap-5 p-6  bg-white">

      <div className="text-lg font-bold flex justify-center mb-8 text-gray-700">
        <Link href="/admin">E-Commerce</Link>
      </div>

      {sideMenuItems.map((item, index) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={index}
            href={item.href}
            className={`navbar-menu flex flex-row gap-4 ${
              isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-800"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        )
      })}
    </div>

  )
} 

export default AdminMenu;