"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Heart, LogOut, Cuboid } from "lucide-react";

const SideMenu = () => {
  const pathname = usePathname();

  const sideMenuItems = [
    { href: "/shop/account/profile", label: "Хувийн мэдээлэл", icon: <User className="menu-icon" /> },
    { href: "/shop/account/wishlist", label: "Хадгалсан", icon: <Heart className="menu-icon" /> },
    { href: "/shop/account/order", label: "Захиалга", icon: <Cuboid className="menu-icon" /> },
    { href: "/auth/logout", label: "Системээс гарах", icon: <LogOut className="menu-icon" /> },
  ];

  return (
    <div className="min-w-56 min-h-screen bg-white p-6 rounded shadow-sm border-gray-200">
      <nav className="flex flex-col gap-5">
        {sideMenuItems.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={index}
              href={item.href}
              className={`navbar-menu flex flex-row gap-4 ${
                isActive ? "text-rose-600 font-semibold" : "text-gray-700 hover:text-rose-500"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default SideMenu;
