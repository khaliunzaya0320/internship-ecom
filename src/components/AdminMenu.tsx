'use client';
import Link from 'next/link';
import {
    ListCheck,
    UserPen,
    LogOut,
    Cuboid,
    Folders,
    Image,
} from 'lucide-react';
import { usePathname } from 'next/navigation';

const AdminMenu = () => {
    const pathname = usePathname();
    const sideMenuItems = [
        {
            href: '/admin/product',
            label: 'Бүтээгдэхүүн',
            icon: <ListCheck className="menu-icon" />,
        },
        {
            href: '/admin/category',
            label: 'Ангилал',
            icon: <Folders className="menu-icon" />,
        },
        {
            href: '/admin/slider',
            label: 'Слайдер',
            icon: <Image className="menu-icon" />,
        },
        {
            href: '/admin/order',
            label: 'Захиалга',
            icon: <Cuboid className="menu-icon" />,
        },
        {
            href: '/admin/user',
            label: 'Хэрэглэгч',
            icon: <UserPen className="menu-icon" />,
        },
        {
            href: '/admin/auth/logout',
            label: 'Системээс гарах',
            icon: <LogOut className="menu-icon" />,
        },
    ];

    return (
        <div className="fixed left-0 flex flex-col h-screen gap-5 p-6  bg-white">
            

            {sideMenuItems.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                    <Link
                        key={index}
                        href={item.href}
                        className={`navbar-menu flex flex-row gap-4 ${
                            isActive
                                ? 'text-blue-600 font-semibold'
                                : 'text-gray-600 hover:text-blue-800'
                        }`}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </Link>
                );
            })}
        </div>
    );
};

export default AdminMenu;
