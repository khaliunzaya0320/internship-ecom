'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Bell, Heart, ShoppingCart, User, LogOut, Package } from 'lucide-react';

const Menu = () => {
    const { data: session, status } = useSession();
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [accountOpen, setAccountOpen] = useState(false);
    const dropdownRef = useRef(null);

    const menuItems = [
        {
            href: '/order',
            label: 'Захиалга хайх',
            icon: <Package className="menu-icon" />,
        },
        {
            href: '/shop/cart',
            label: 'Сагс',
            icon: <ShoppingCart className="menu-icon" />,
        },
    ];

    // Click outside to close dropdowns
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !(dropdownRef.current as HTMLElement).contains(
                    event.target as Node,
                )
            ) {
                setOpen(false);
                setAccountOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (
        <nav
            className="flex gap-6 text-sm font-medium items-center relative text-gray-200"
            ref={dropdownRef}
        >
            {/* Notification dropdown - зөвхөн нэвтэрсэн хэрэглэгчдэд харуулах */}
            {session && (
                <div className="relative">
                    <button
                        onClick={() => setOpen(!open)}
                        className={`navbar-menu flex flex-col items-center ${
                            open
                                ? 'text-rose-500 font-semibold'
                                : 'text-gray-200 hover:text-rose-400'
                        }`}
                    >
                        <Bell className="menu-icon" />
                        <span>Мэдэгдэл</span>
                    </button>

                    {open && (
                        <div className="absolute -right-36 mt-4 w-80 shadow-xl border rounded-md z-50 p-4 bg-white font-normal">
                            <ul className="">
                                <li className="border-b py-4 px-2 text-sm">
                                    Захиалга цуцлагдлаа - 2025/6/9 13:35
                                </li>
                                <li className="border-b py-2 px-2 text-sm">
                                    Захиалга цуцлагдлаа - 2025/6/9 13:35
                                </li>
                            </ul>
                            <div className="mt-2 text-right">
                                <Link
                                    href="/shop/account/order"
                                    className="text-rose-500 hover:underline font-medium text-sm"
                                >
                                    Бүгдийг харах
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            )}
            {/* Other menu items */}
            {menuItems.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                    <Link
                        key={index}
                        href={item.href}
                        className={`navbar-menu flex flex-col items-center ${
                            isActive
                                ? 'text-rose-500 font-semibold'
                                : 'text-gray-200 hover:text-rose-400'
                        }`}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </Link>
                );
            })}{' '}
            {/* Account menu - conditional based on authentication */}
            {session ? (
                <div className="relative">
                    {' '}
                    <button
                        onClick={() => setAccountOpen(!accountOpen)}
                        className={`navbar-menu flex flex-col items-center ${
                            accountOpen || pathname.startsWith('/account')
                                ? 'text-rose-500 font-semibold'
                                : 'text-gray-200 hover:text-rose-400'
                        }`}
                    >
                        <User className="menu-icon" />
                        <span>{session.user?.name || 'Хэрэглэгч'}</span>
                    </button>{' '}
                    {accountOpen && (
                        <div className="absolute -right-8 mt-4 w-48 shadow-xl border rounded-md z-50 bg-white font-normal">
                            <ul className="">
                                <li>
                                    <Link
                                        href="/account"
                                        className="block px-4 py-3 text-sm hover:bg-gray-100 border-b"
                                        onClick={() => setAccountOpen(false)}
                                    >
                                        <div className="flex items-center gap-2">
                                            <svg
                                                className="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2V7zm8 6l4-4m0 0l-4-4m4 4H7"
                                                />
                                            </svg>
                                            Хяналтын самбар
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/account/profile"
                                        className="block px-4 py-3 text-sm hover:bg-gray-100 border-b"
                                        onClick={() => setAccountOpen(false)}
                                    >
                                        <div className="flex items-center gap-2">
                                            <User className="w-4 h-4" />
                                            Хувийн мэдээлэл
                                        </div>
                                    </Link>
                                </li>
                                {session.user?.role === 'ADMIN' && (
                                    <li>
                                        <Link
                                            href="/admin"
                                            className="block px-4 py-3 text-sm hover:bg-gray-100 border-b"
                                            onClick={() =>
                                                setAccountOpen(false)
                                            }
                                        >
                                            <div className="flex items-center gap-2">
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                    />
                                                </svg>
                                                Админ самбар
                                            </div>
                                        </Link>
                                    </li>
                                )}
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
                        pathname === '/auth/login'
                            ? 'text-rose-500 font-semibold'
                            : 'text-gray-200 hover:text-rose-400'
                    }`}
                >
                    <User className="menu-icon" />
                    <span>Нэвтрэх</span>
                </Link>
            )}
        </nav>
    );
};

export default Menu;
