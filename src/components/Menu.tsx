'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { Bell, Heart, ShoppingCart, User, LogOut, Package } from 'lucide-react';
import { useNotification } from '@/context/NotificationContext'; 


const Menu = () => {
    const { data: session, status } = useSession();
    const pathname = usePathname();
    const [open, setOpen] = useState(false); 
    const [accountOpen, setAccountOpen] = useState(false); 
    const dropdownRef = useRef<HTMLDivElement>(null);

    const { notifications, markAsRead, clearNotifications } = useNotification();
    const unreadNotificationsCount = notifications.filter(notif => !notif.read).length;
    
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
        {
            href: '/account/wishlist',
            label: 'Хадгалсан',
            icon: <Heart className="menu-icon" />,
            authRequired: true,
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

    const handleSignOut = async () => {
        setAccountOpen(false);
        await signOut({ callbackUrl: '/' });
    };

    return (
        <nav
            className="flex gap-6 text-sm font-medium items-center relative text-gray-200"
            ref={dropdownRef}
        >
            {/* Notification dropdown */}
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
                        {unreadNotificationsCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                                {unreadNotificationsCount}
                            </span>
                        )}
                        <span>Мэдэгдэл</span>
                    </button>

                    {open && (
                        <div className="absolute -right-80 mt-4 w-96 shadow-2xl border rounded-md z-50 p-4 bg-white font-normal">
                            <h3 className="font-semibold text-gray-800 mb-2">Шинэ мэдэгдлүүд</h3>
                            {unreadNotificationsCount > 0 ? (
                                <ul className="space-y-2">
                                    {notifications.filter(notif => !notif.read).slice(0, 5).map((notif) => (
                                        <li key={notif.id} className={`border-b border-gray-100 pb-2 ${notif.read ? 'text-gray-500' : 'text-gray-700'}`}>
                                            <p className="text-sm font-medium">{notif.message}</p>
                                            <div className='flex flex-row justify-between items-center'>
                                                <p className="text-xs text-gray-400">{notif.date}</p>
                                                <button
                                                    onClick={() => markAsRead(notif.id)}
                                                    className="text-blue-500 hover:underline text-xs mt-1"
                                                >
                                                    Уншсан
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-center text-gray-500 text-sm py-4">Шинэ мэдэгдэл байхгүй.</p>
                            )}
                            {notifications.length > 0 && (
                                <div className="mt-4 text-right">
                                    <button
                                        onClick={() => {
                                            clearNotifications(); 
                                            setOpen(false); 
                                        }}
                                        className="text-red-500 hover:underline font-medium text-sm"
                                        >
                                        Бүх мэдэгдлийг цэвэрлэх
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Other menu items */}
            {menuItems.map((item, index) => {
                if (item.authRequired && !session) {
                    return null;
                }
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
                        <div className="absolute -right-8 mt-4 w-48 shadow-2xl border rounded-md z-50 bg-white text-gray-800 font-normal">
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