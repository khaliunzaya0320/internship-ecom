'use client';

import { useEffect, useState } from 'react';
import {
    ShoppingBag,
    ShoppingCart,
    Package,
    Truck,
    CheckCircle,
    Users,
    UserCheck,
    UserX,
    TrendingUp,
    BarChart3,
} from 'lucide-react';

interface DashboardData {
    totalProducts: number;
    totalOrders: number;
    newOrders: number;
    shippedOrders: number;
    deliveredOrders: number;
    totalUsers: number;
    usersWithOrders: number;
    usersWithoutOrders: number;
    weeklyOrders: any[];
    productsByCategory: any[];
    topProducts: any[];
}

const AdminPage = () => {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await fetch('/api/admin/dashboard');
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="text-center text-red-600">
                Датаг ачаалж чадсангүй
            </div>
        );
    }

    const statCards = [
        {
            title: 'Нийт бүтээгдэхүүн',
            value: data.totalProducts,
            icon: <ShoppingBag className="w-8 h-8" />,
            color: 'bg-blue-500',
        },
        {
            title: 'Нийт захиалга',
            value: data.totalOrders,
            icon: <ShoppingCart className="w-8 h-8" />,
            color: 'bg-green-500',
        },
        {
            title: 'Шинэ захиалга (30 хоног)',
            value: data.newOrders,
            icon: <Package className="w-8 h-8" />,
            color: 'bg-yellow-500',
        },
        {
            title: 'Хүргэлтэнд гарсан',
            value: data.shippedOrders,
            icon: <Truck className="w-8 h-8" />,
            color: 'bg-orange-500',
        },
        {
            title: 'Хүргэгдсэн',
            value: data.deliveredOrders,
            icon: <CheckCircle className="w-8 h-8" />,
            color: 'bg-emerald-500',
        },
        {
            title: 'Нийт хэрэглэгч',
            value: data.totalUsers,
            icon: <Users className="w-8 h-8" />,
            color: 'bg-purple-500',
        },
        {
            title: 'Захиалга хийсэн',
            value: data.usersWithOrders,
            icon: <UserCheck className="w-8 h-8" />,
            color: 'bg-indigo-500',
        },
        {
            title: 'Захиалга хийгээгүй',
            value: data.usersWithoutOrders,
            icon: <UserX className="w-8 h-8" />,
            color: 'bg-red-500',
        },
    ];

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">
                    Хяналтын самбар
                </h1>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <BarChart3 className="w-4 h-4" />
                    <span>Статистик мэдээлэл</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-md p-6"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    {stat.title}
                                </p>
                                <p className="text-3xl font-bold text-gray-900">
                                    {stat.value.toLocaleString()}
                                </p>
                            </div>
                            <div
                                className={`${stat.color} rounded-full p-3 text-white`}
                            >
                                {stat.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Products */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Хамгийн их захиалагдсан бүтээгдэхүүн
                        </h2>
                        <TrendingUp className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="space-y-4">
                        {data.topProducts.map((product, index) => (
                            <div
                                key={product.id}
                                className="flex items-center space-x-4"
                            >
                                <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                                    <span className="text-sm font-semibold text-gray-600">
                                        #{index + 1}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        {product.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {product.totalOrdered} ширхэг
                                        захиалагдсан
                                    </p>
                                </div>
                                <div className="text-sm font-semibold text-gray-900">
                                    ₮{product.price?.toLocaleString()}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Categories */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Ангилал тус бүрийн бүтээгдэхүүн
                        </h2>
                        <BarChart3 className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="space-y-4">
                        {data.productsByCategory.map((category) => (
                            <div
                                key={category.id}
                                className="flex items-center justify-between"
                            >
                                <span className="text-sm font-medium text-gray-900">
                                    {category.name}
                                </span>
                                <span className="text-sm text-gray-500">
                                    {category._count.products} бүтээгдэхүүн
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Сүүлийн үйл ажиллагаа
                </h2>
                <div className="text-center py-8 text-gray-500">
                    <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>
                        Сүүлийн үйл ажиллагааны мэдээлэл удахгүй нэмэгдэх болно
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
