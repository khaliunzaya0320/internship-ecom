'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { Menu as MenuIcon, X, Bell, Heart, ShoppingCart, User, LogOut, Package } from 'lucide-react';

const MobileMenu = () => {
    const { data: session, status } = useSession();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false); 
    const menuRef = useRef<HTMLDivElement>(null); 

    const menuItems = [
        {
            href: '/order',
            label: 'Захиалга хайх',
            icon: <Package className="w-5 h-5" />,
            authRequired: false,
        },
        {
            href: '/shop/cart',
            label: 'Сагс',
            icon: <ShoppingCart className="w-5 h-5" />,
            authRequired: false,
        },
        {
            href: '/shop/liked-products',
            label: 'Таалагдсан',
            icon: <Heart className="w-5 h-5" />,
            authRequired: true,
        },
        {
            href: '/account/notifications', 
            label: 'Мэдэгдэл',
            icon: <Bell className="w-5 h-5" />,
            authRequired: true,
        },
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLinkClick = () => {
        setIsOpen(false); 
    };

    const handleSignOut = async () => {
        setIsOpen(false);
        await signOut({ callbackUrl: '/' });
    };

    return (
        <div className="relative flex items-center" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-200 hover:text-rose-400 focus:outline-none"
            >
                {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white shadow-lg rounded-lg border z-50 text-gray-800">
                    <ul>
                        {session ? (
                            <>
                                <li>
                                    <Link
                                        href="/account"
                                        className="block px-4 py-3 text-sm hover:bg-gray-100 border-b"
                                        onClick={handleLinkClick}
                                    >
                                        <div className="flex items-center gap-2">
                                            <User className="w-4 h-4" />
                                            <span>{session.user?.name || 'Хэрэглэгч'}</span>
                                        </div>
                                    </Link>
                                </li>
                                {session.user?.role === 'ADMIN' && (
                                    <li>
                                        <Link
                                            href="/admin"
                                            className="block px-4 py-3 text-sm hover:bg-gray-100 border-b"
                                            onClick={handleLinkClick}
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
                            </>
                        ) : (
                            <li>
                                <Link
                                    href="/auth/login"
                                    className="block px-4 py-3 text-sm hover:bg-gray-100 border-b"
                                    onClick={handleLinkClick}
                                >
                                    <div className="flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        Нэвтрэх
                                    </div>
                                </Link>
                            </li>
                        )}

                        {menuItems.map((item, index) => {
                            if (item.authRequired && !session) {
                                return null;
                            }
                            return (
                                <li key={index}>
                                    <Link
                                        href={item.href}
                                        className="block px-4 py-3 text-sm hover:bg-gray-100 border-b"
                                        onClick={handleLinkClick}
                                    >
                                        <div className="flex items-center gap-2">
                                            {item.icon}
                                            {item.label}
                                        </div>
                                    </Link>
                                </li>
                            );
                        })}

                        {session && (
                            <li>
                                <button
                                    onClick={handleSignOut}
                                    className="block w-full text-left px-4 py-3 text-sm hover:bg-gray-100 text-red-600"
                                >
                                    <div className="flex items-center gap-2">
                                        <LogOut className="w-4 h-4" />
                                        Гарах
                                    </div>
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MobileMenu;