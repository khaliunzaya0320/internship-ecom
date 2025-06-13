'use client';

import { useState, useEffect } from 'react';
import {
    Search,
    Filter,
    Package,
    User,
    Calendar,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';

interface Order {
    id: number;
    total: number;
    status: 'PENDING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
    createdAt: string;
    user: {
        id: number;
        name: string;
        email: string;
    };
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
}

interface OrdersResponse {
    orders: Order[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}

const AdminOrderPage = () => {
    const [ordersData, setOrdersData] = useState<OrdersResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchOrders();
    }, [currentPage, statusFilter, searchTerm]);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams({
                page: currentPage.toString(),
                limit: '20',
            });

            if (statusFilter !== 'all') {
                params.append('status', statusFilter);
            }

            if (searchTerm.trim()) {
                params.append('search', searchTerm.trim());
            }

            const response = await fetch(`/api/admin/order?${params}`);
            if (response.ok) {
                const data = await response.json();
                setOrdersData(data);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (orderId: number, newStatus: string) => {
        try {
            const response = await fetch(`/api/admin/order/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                fetchOrders(); // Жагсаалт дахин ачаалах
            } else {
                alert('Захиалгын төлөв өөрчлөхөд алдаа гарлаа');
            }
        } catch (error) {
            console.error('Error updating order status:', error);
            alert('Захиалгын төлөв өөрчлөхөд алдаа гарлаа');
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

    const getStatusText = (status: string) => {
        switch (status) {
            case 'PENDING':
                return 'Хүлээгдэж байна';
            case 'SHIPPED':
                return 'Хүргэлтэнд';
            case 'DELIVERED':
                return 'Хүргэгдсэн';
            case 'CANCELLED':
                return 'Цуцлагдсан';
            default:
                return status;
        }
    };

    const handleSearch = () => {
        setCurrentPage(1);
        fetchOrders();
    };

    if (loading && !ordersData) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-900">
                    Захиалга удирдах
                </h1>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Package className="w-4 h-4" />
                    <span>
                        Нийт: {ordersData?.pagination.total || 0} захиалга
                    </span>
                </div>
            </div>{' '}
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="relative sm:col-span-2">
                        <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Захиалгын дугаар, хэрэглэгчийн нэр эсвэл имэйл хайх..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={(e) =>
                                e.key === 'Enter' && handleSearch()
                            }
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div className="relative">
                        <Filter className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                        <select
                            value={statusFilter}
                            onChange={(e) => {
                                setStatusFilter(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                        >
                            <option value="all">Бүх төлөв</option>
                            <option value="PENDING">Хүлээгдэж байна</option>
                            <option value="SHIPPED">Хүргэлтэнд</option>
                            <option value="DELIVERED">Хүргэгдсэн</option>
                            <option value="CANCELLED">Цуцлагдсан</option>
                        </select>
                    </div>
                    <button
                        onClick={handleSearch}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full sm:w-auto"
                    >
                        Хайх
                    </button>
                </div>
            </div>
            {/* Orders - Desktop: Table, Mobile: Cards */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Desktop Table View */}
                <div className="hidden lg:block overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Захиалга
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Хэрэглэгч
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Бүтээгдэхүүн
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Нийт дүн
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Төлөв
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Огноо
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Үйлдэл
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {ordersData?.orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            #{order.id}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <User className="w-8 h-8 text-gray-400 mr-3" />
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {order.user.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {order.user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {order.items
                                                .slice(0, 2)
                                                .map((item) => (
                                                    <div
                                                        key={item.id}
                                                        className="flex items-center space-x-2"
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
                                                            className="w-8 h-8 rounded object-cover"
                                                        />
                                                        <span className="text-xs text-gray-600">
                                                            {item.quantity}x
                                                        </span>
                                                    </div>
                                                ))}
                                            {order.items.length > 2 && (
                                                <span className="text-xs text-gray-500">
                                                    +{order.items.length - 2}{' '}
                                                    өөр
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-semibold text-gray-900">
                                            ₮{order.total.toLocaleString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <select
                                            value={order.status}
                                            onChange={(e) =>
                                                handleStatusChange(
                                                    order.id,
                                                    e.target.value,
                                                )
                                            }
                                            className={`text-xs font-medium px-2.5 py-1.5 rounded-full border-0 ${getStatusColor(order.status)}`}
                                        >
                                            <option value="PENDING">
                                                Хүлээгдэж байна
                                            </option>
                                            <option value="SHIPPED">
                                                Хүргэлтэнд
                                            </option>
                                            <option value="DELIVERED">
                                                Хүргэгдсэн
                                            </option>
                                            <option value="CANCELLED">
                                                Цуцлагдсан
                                            </option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Calendar className="w-4 h-4 mr-1" />
                                            {new Date(
                                                order.createdAt,
                                            ).toLocaleDateString('mn-MN')}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <a
                                            href={`/order/${order.id}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-900"
                                        >
                                            Харах
                                        </a>
                                    </td>
                                </tr>
                            ))}{' '}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card View */}
                <div className="lg:hidden">
                    <div className="p-4 space-y-4">
                        {ordersData?.orders.map((order) => (
                            <div
                                key={order.id}
                                className="border border-gray-200 rounded-lg p-4"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm font-medium text-gray-900">
                                            #{order.id}
                                        </span>
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                                order.status,
                                            )}`}
                                        >
                                            {getStatusText(order.status)}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-medium text-gray-900">
                                            {order.total.toLocaleString()}₮
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {new Date(
                                                order.createdAt,
                                            ).toLocaleDateString('mn-MN')}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3 mb-3">
                                    <User className="w-8 h-8 text-gray-400" />
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">
                                            {order.user.name}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {order.user.email}
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <div className="text-xs text-gray-500 mb-2">
                                        Бүтээгдэхүүн:
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {order.items.slice(0, 3).map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex items-center space-x-2 bg-gray-50 rounded px-2 py-1"
                                            >
                                                <img
                                                    src={
                                                        item.product.imageUrl ||
                                                        '/placeholder.png'
                                                    }
                                                    alt={item.product.name}
                                                    className="w-6 h-6 rounded object-cover"
                                                />
                                                <span className="text-xs text-gray-600">
                                                    {item.quantity}x{' '}
                                                    {item.product.name.length >
                                                    15
                                                        ? item.product.name.substring(
                                                              0,
                                                              15,
                                                          ) + '...'
                                                        : item.product.name}
                                                </span>
                                            </div>
                                        ))}
                                        {order.items.length > 3 && (
                                            <span className="text-xs text-gray-500 px-2 py-1">
                                                +{order.items.length - 3} өөр
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <select
                                            value={order.status}
                                            onChange={(e) =>
                                                handleStatusChange(
                                                    order.id,
                                                    e.target.value,
                                                )
                                            }
                                            className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="PENDING">
                                                Хүлээгдэж байна
                                            </option>
                                            <option value="SHIPPED">
                                                Хүргэлтэнд
                                            </option>
                                            <option value="DELIVERED">
                                                Хүргэгдсэн
                                            </option>
                                            <option value="CANCELLED">
                                                Цуцлагдсан
                                            </option>
                                        </select>
                                    </div>
                                    <a
                                        href={`/order/${order.id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-900 text-sm"
                                    >
                                        Харах
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>{' '}
            {/* Pagination */}
            {ordersData && ordersData.pagination.pages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between bg-white px-4 sm:px-6 py-3 rounded-lg shadow-md">
                    <div className="flex items-center text-sm text-gray-700 mb-4 sm:mb-0">
                        <span>
                            Нийт {ordersData.pagination.total} захиалгаас{' '}
                            {(ordersData.pagination.page - 1) *
                                ordersData.pagination.limit +
                                1}
                            -
                            {Math.min(
                                ordersData.pagination.page *
                                    ordersData.pagination.limit,
                                ordersData.pagination.total,
                            )}{' '}
                            харуулж байна
                        </span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() =>
                                setCurrentPage(Math.max(1, currentPage - 1))
                            }
                            disabled={currentPage === 1}
                            className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <span className="text-sm text-gray-700">
                            {currentPage} / {ordersData.pagination.pages}
                        </span>
                        <button
                            onClick={() =>
                                setCurrentPage(
                                    Math.min(
                                        ordersData.pagination.pages,
                                        currentPage + 1,
                                    ),
                                )
                            }
                            disabled={
                                currentPage === ordersData.pagination.pages
                            }
                            className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}
            {ordersData?.orders.length === 0 && (
                <div className="text-center py-12">
                    <Package className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Захиалга олдсонгүй
                    </h3>
                    <p className="text-gray-500">
                        Таны хайлтад тохирох захиалга байхгүй байна.
                    </p>
                </div>
            )}
        </div>
    );
};

export default AdminOrderPage;
