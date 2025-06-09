"use client"

import { useState, useRef, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Bell, Heart, ShoppingCart, User } from "lucide-react"

const Menu = () => {

  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)

  const menuItems = [
    { href: "/shop/cart", label: "Сагс", icon: <ShoppingCart className="menu-icon" /> },
    { href: "/shop/account", label: "Account", icon: <User className="menu-icon" /> },
  ]

  return (
    <nav className="flex gap-6 text-sm font-medium items-center relative" ref={dropdownRef}>
      
      {/* Notification dropdown */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className={`navbar-menu flex flex-col items-center ${
            open ? "text-rose-500 font-semibold" : "text-gray-600 hover:text-rose-400"
          }`}
        >
          <Bell className="menu-icon" />
          <span>Мэдэгдэл</span>
        </button>

        {open && (
          <div className="absolute -right-36 mt-4 w-80 shadow-xl border rounded-md z-50 p-4 bg-white font-normal">
            <ul className="">
              <li className="border-b py-4 px-2 text-sm">Захиалга цуцлагдлаа - 2025/6/9 13:35</li>
              <li className="border-b py-2 px-2 text-sm">Захиалга цуцлагдлаа - 2025/6/9 13:35</li>
            </ul>
            <div className="mt-2 text-right">
              <Link href="/shop/account/order" className="text-rose-500 hover:underline font-medium text-sm">
                Бүгдийг харах
              </Link>
            </div>
          </div>
        )}

      </div>

      {/* Other menu items */}
      {menuItems.map((item, index) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={index}
            href={item.href}
            className={`navbar-menu flex flex-col items-center ${
              isActive ? "text-rose-500 font-semibold" : "text-gray-600 hover:text-rose-400"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        )
      })}

    </nav>
  )
}

export default Menu
