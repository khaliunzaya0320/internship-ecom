"use client"

import { useState, useRef, useEffect } from "react"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { Bell, Heart, ShoppingCart, User, LogOut } from "lucide-react"

const Menu = () => {
  const { data: session, status } = useSession()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const dropdownRef = useRef(null)
  const menuItems = [
    { href: "/shop/cart", label: "Сагс", icon: <ShoppingCart className="menu-icon" /> },
  ]

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !(dropdownRef.current as HTMLElement).contains(event.target as Node)) {
        setOpen(false)
        setAccountOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  return (
    <nav className="flex gap-6 text-sm font-medium items-center relative" ref={dropdownRef}>
      
      {/* Notification dropdown - зөвхөн нэвтэрсэн хэрэглэгчдэд харуулах */}
      {session && (
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
      )}{/* Other menu items */}
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
      })}      {/* Account menu - conditional based on authentication */}
      {session ? (
        <div className="relative">
          <button
            onClick={() => setAccountOpen(!accountOpen)}
            className={`navbar-menu flex flex-col items-center ${
              accountOpen || pathname.startsWith("/shop/account") ? "text-rose-500 font-semibold" : "text-gray-600 hover:text-rose-400"
            }`}
          >
            <User className="menu-icon" />
            <span>{session.user?.name || 'Хэрэглэгч'}</span>
          </button>

          {accountOpen && (
            <div className="absolute -right-8 mt-4 w-48 shadow-xl border rounded-md z-50 bg-white font-normal">
              <ul className="">
                <li>
                  <Link 
                    href="/shop/account/profile" 
                    className="block px-4 py-3 text-sm hover:bg-gray-100 border-b"
                    onClick={() => setAccountOpen(false)}
                  >
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Профайл
                    </div>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/auth/logout" 
                    className="block px-4 py-3 text-sm hover:bg-gray-100 text-red-600"
                    onClick={() => setAccountOpen(false)}
                  >
                    <div className="flex items-center gap-2">
                      <LogOut className="w-4 h-4" />
                      Гарах
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <Link
          href="/auth/login"
          className={`navbar-menu flex flex-col items-center ${
            pathname === "/auth/login" ? "text-rose-500 font-semibold" : "text-gray-600 hover:text-rose-400"
          }`}
        >
          <User className="menu-icon" />
          <span>Нэвтрэх</span>
        </Link>
      )}

    </nav>
  )
}

export default Menu
