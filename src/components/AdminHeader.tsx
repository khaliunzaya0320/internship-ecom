"use client"
import Menu from "./Menu";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { useState, useRef, useEffect } from "react"
import {Bell, CircleUserRound } from "lucide-react"


const Header = () => {

  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)

  return (
    <div className="sticky top-0 z-50 bg-white shadow-sm h-16 flex items-center justify-end gap-8 pr-10">
      
      <SearchBar />

      {/* Notification dropdown */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className={`navbar-menu flex flex-col items-center ${
            open ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-800"
          }`}
        >
          <Bell className="w-5 h-5" />
        </button>
        {open && (
          <div className="absolute -right-20 mt-6 w-80 shadow-xl border rounded-md z-50 p-4 bg-white font-normal">
            <ul className="">
              <li className="border-b py-4 px-2 text-sm">Захиалга бүртгэгдлээ - 2025/6/9 13:35</li>
              <li className="border-b py-2 px-2 text-sm">Захиалга бүртгэгдлээ - 2025/6/9 13:35</li>
            </ul>
            <div className="mt-2 text-right">
              <Link href="/admin/orders" className="text-blue-600 hover:underline font-medium text-sm">
                Бүгдийг харах
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="">
        <Link href={"/admin/profile"}>
          <CircleUserRound  className="w-5 h-5 text-gray-600 hover:text-blue-600"/>
        </Link>
      </div>

    </div>
  );
}

export default Header;
