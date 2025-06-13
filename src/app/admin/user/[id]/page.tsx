'use client';

import { useState, useEffect } from 'react';
import {
    ArrowLeft,
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    ShoppingBag,
    Heart,
    ShoppingCart,
    Package,
    ExternalLink,
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface UserDetail {
    id: number;
    name: string;
    email: string;
    phone?: string;
    role: 'USER' | 'ADMIN';
    createdAt: string;
    orders: {
        id: number;
        total: number;
        status: string;
        createdAt: string;
        items: {
            id: number;
            quantity: number;
            price: number;
            product: {
                id: number;
                name: string;
                imageUrl: string;
                price: number;
            };
        }[];
    }[];
    cartItems: {
        id: number;
        quantity: number;
        product: {
            id: number;
            name: string;
            imageUrl: string;
            price: number;
        };
    }[];
    wishlist: {
        id: number;
        product: {
            id: number;
            name: string;
            imageUrl: string;
            price: number;
        };
    }[];
    addresses: {
        id: number;
        street: string;
        city: string;
        state: string;
        zipCode: string;
        isDefault: boolean;
    }[];
    viewedProducts: {
        id: number;
        viewedAt: string;
        product: {
            id: number;
            name: string;
            imageUrl: string;
            price: number;
        };
    }[];
    stats: {
        totalSpent: number;
        totalOrders: number;
        cartItemsCount: number;
        wishlistCount: number;
    };
}

const AdminUserDetailPage = () => {
    const params = useParams();
    const userId = params.id as string;
    const [user, setUser] = useState<{ user: UserDetail; stats: any } | null>(
        null,
    );
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        if (userId) {
            fetchUserDetail();
        }
    }, [userId]);

    const fetchUserDetail = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/admin/user/${userId}`);
            if (response.ok) {
                const data = await response.json();
                setUser(data);
            }
        } catch (error) {
            console.error('Error fetching user detail:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PENDING':
                return 'bg-yellow-100 text-yellow-800';
            case 'SHIPPED':
                return 'bg-blue-100 text-blue-800';
            case 'DELIVERED':
                return 'bg-green-100 text-green-800';
            case 'CANCELLED':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="text-center py-12">
                <User className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Хэрэглэгч олдсонгүй
                </h3>
                <Link
                    href="/admin/user"
                    className="text-blue-600 hover:text-blue-800"
                >
                    Буцах
                </Link>
            </div>
        );
    }

    const { user: userDetail } = user;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link
                        href="/admin/user"
                        className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {userDetail.name}
                        </h1>
                        <p className="text-gray-500">
                            Хэрэглэгчийн дэлгэрэнгүй мэдээлэл
                        </p>
                    </div>
                </div>
                <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        userDetail.role === 'ADMIN'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-blue-100 text-blue-800'
                    }`}
                >
                    {userDetail.role === 'ADMIN' ? 'Админ' : 'Хэрэглэгч'}
                </span>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">
                                Нийт захиалга
                            </p>
                            <p className="text-3xl font-bold text-gray-900">
                                {user.stats.totalOrders}
                            </p>
                        </div>
                        <ShoppingBag className="w-8 h-8 text-blue-500" />
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">
                                Нийт зарцуулсан
                            </p>
                            <p className="text-3xl font-bold text-gray-900">
                                ₮{user.stats.totalSpent.toLocaleString()}
                            </p>
                        </div>
                        <Package className="w-8 h-8 text-green-500" />
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">
                                Сагсанд
                            </p>
                            <p className="text-3xl font-bold text-gray-900">
                                {user.stats.cartItemsCount}
                            </p>
                        </div>
                        <ShoppingCart className="w-8 h-8 text-orange-500" />
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">
                                Хадгалсан
                            </p>
                            <p className="text-3xl font-bold text-gray-900">
                                {user.stats.wishlistCount}
                            </p>
                        </div>
                        <Heart className="w-8 h-8 text-red-500" />
                    </div>
                </div>
            </div>

            {/* User Info Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Хувийн мэдээлэл
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <User className="w-5 h-5 text-gray-400" />
                            <div>
                                <p className="text-sm text-gray-500">Нэр</p>
                                <p className="text-sm font-medium text-gray-900">
                                    {userDetail.name}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Mail className="w-5 h-5 text-gray-400" />
                            <div>
                                <p className="text-sm text-gray-500">Имэйл</p>
                                <p className="text-sm font-medium text-gray-900">
                                    {userDetail.email}
                                </p>
                            </div>
                        </div>
                        {userDetail.phone && (
                            <div className="flex items-center space-x-3">
                                <Phone className="w-5 h-5 text-gray-400" />
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Утас
                                    </p>
                                    <p className="text-sm font-medium text-gray-900">
                                        {userDetail.phone}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <Calendar className="w-5 h-5 text-gray-400" />
                            <div>
                                <p className="text-sm text-gray-500">
                                    Бүртгүүлсэн огноо
                                </p>
                                <p className="text-sm font-medium text-gray-900">
                                    {new Date(
                                        userDetail.createdAt,
                                    ).toLocaleDateString('mn-MN')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-md">
                <div className="border-b border-gray-200">
                    <nav className="flex space-x-8 px-6">
                        {[
                            {
                                id: 'orders',
                                label: 'Захиалгууд',
                                count: userDetail.orders.length,
                            },
                            {
                                id: 'cart',
                                label: 'Сагс',
                                count: userDetail.cartItems.length,
                            },
                            {
                                id: 'wishlist',
                                label: 'Хадгалсан',
                                count: userDetail.wishlist.length,
                            },
                            {
                                id: 'addresses',
                                label: 'Хаягууд',
                                count: userDetail.addresses.length,
                            },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === tab.id
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                {tab.label} ({tab.count})
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="p-6">
                    {/* Orders Tab */}
                    {activeTab === 'orders' && (
                        <div className="space-y-4">
                            {userDetail.orders.length === 0 ? (
                                <p className="text-gray-500 text-center py-8">
                                    Захиалга байхгүй
                                </p>
                            ) : (
                                userDetail.orders.map((order) => (
                                    <div
                                        key={order.id}
                                        className="border rounded-lg p-4"
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center space-x-4">
                                                <h3 className="font-medium text-gray-900">
                                                    Захиалга #{order.id}
                                                </h3>
                                                <span
                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                                                >
                                                    {order.status}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <span className="text-sm font-semibold text-gray-900">
                                                    ₮
                                                    {order.total.toLocaleString()}
                                                </span>
                                                <Link
                                                    href={`/order/${order.id}`}
                                                    target="_blank"
                                                    className="text-blue-600 hover:text-blue-900 flex items-center space-x-1"
                                                >
                                                    <span className="text-sm">
                                                        Харах
                                                    </span>
                                                    <ExternalLink className="w-4 h-4" />
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {order.items
                                                .slice(0, 3)
                                                .map((item) => (
                                                    <div
                                                        key={item.id}
                                                        className="flex items-center space-x-2 bg-gray-50 rounded px-2 py-1"
                                                    >
                                                        <img
                                                            src={
                                                                item.product
                                                                    .imageUrl ||
                                                                '/placeholder.png'
                                                            }
                                                            alt={
                                                                item.product
                                                                    .name
                                                            }
                                                            className="w-6 h-6 rounded object-cover"
                                                        />
                                                        <span className="text-xs text-gray-600">
                                                            {item.quantity}x{' '}
                                                            {item.product.name}
                                                        </span>
                                                    </div>
                                                ))}
                                            {order.items.length > 3 && (
                                                <span className="text-xs text-gray-500 px-2 py-1">
                                                    +{order.items.length - 3}{' '}
                                                    өөр
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {/* Cart Tab */}
                    {activeTab === 'cart' && (
                        <div className="space-y-4">
                            {userDetail.cartItems.length === 0 ? (
                                <p className="text-gray-500 text-center py-8">
                                    Сагс хоосон
                                </p>
                            ) : (
                                userDetail.cartItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center space-x-4 border rounded-lg p-4"
                                    >
                                        <img
                                            src={
                                                item.product.imageUrl ||
                                                '/placeholder.png'
                                            }
                                            alt={item.product.name}
                                            className="w-16 h-16 rounded object-cover"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-medium text-gray-900">
                                                {item.product.name}
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                Тоо: {item.quantity}
                                            </p>
                                        </div>
                                        <span className="font-semibold text-gray-900">
                                            ₮
                                            {item.product.price.toLocaleString()}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {/* Wishlist Tab */}
                    {activeTab === 'wishlist' && (
                        <div className="space-y-4">
                            {userDetail.wishlist.length === 0 ? (
                                <p className="text-gray-500 text-center py-8">
                                    Хадгалсан бараа байхгүй
                                </p>
                            ) : (
                                userDetail.wishlist.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center space-x-4 border rounded-lg p-4"
                                    >
                                        <img
                                            src={
                                                item.product.imageUrl ||
                                                '/placeholder.png'
                                            }
                                            alt={item.product.name}
                                            className="w-16 h-16 rounded object-cover"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-medium text-gray-900">
                                                {item.product.name}
                                            </h3>
                                        </div>
                                        <span className="font-semibold text-gray-900">
                                            ₮
                                            {item.product.price.toLocaleString()}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {/* Addresses Tab */}
                    {activeTab === 'addresses' && (
                        <div className="space-y-4">
                            {userDetail.addresses.length === 0 ? (
                                <p className="text-gray-500 text-center py-8">
                                    Хаяг байхгүй
                                </p>
                            ) : (
                                userDetail.addresses.map((address) => (
                                    <div
                                        key={address.id}
                                        className="flex items-start space-x-4 border rounded-lg p-4"
                                    >
                                        <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2">
                                                <h3 className="font-medium text-gray-900">
                                                    {address.street},{' '}
                                                    {address.city}
                                                </h3>
                                                {address.isDefault && (
                                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                                                        Үндсэн
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-600">
                                                {address.state},{' '}
                                                {address.zipCode}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminUserDetailPage;
