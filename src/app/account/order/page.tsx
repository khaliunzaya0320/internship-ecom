'use client';

import { useEffect, useState } from 'react';
import { Order } from '@/types';
import Link from 'next/link';
import { Package, Filter, Calendar, Eye } from 'lucide-react';

const OrderPage = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
    const [statusFilter, setStatusFilter] = useState('ALL');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    useEffect(() => {
        if (statusFilter === 'ALL') {
            setFilteredOrders(orders);
        } else {
            setFilteredOrders(
                orders.filter((order) => order.status === statusFilter),
            );
        }
    }, [orders, statusFilter]);

    const fetchOrders = async () => {
        try {
            const res = await fetch('/api/order');
            if (res.ok) {
                const data = await res.json();
                setOrders(data);
            }
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'PENDING':
                return 'Хүлээгдэж буй';
            case 'DELIVERED':
                return 'Хүргэгдсэн';
            default:
                return status;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PENDING':
                return 'text-yellow-600 bg-yellow-100';
            case 'DELIVERED':
                return 'text-green-600 bg-green-100';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    };

    if (loading) {
        return (
            <div className="m-6">
                <div className="text-center text-gray-500">
                    Ачааллаж байна...
                </div>
            </div>
        );
    }

    return (
        <div className="m-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="primary-header">Миний захиалгууд</h1>

                {/* Status Filter */}
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-500" />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                    >
                        <option value="ALL">Бүгд</option>
                        <option value="PENDING">Хүлээгдэж буй</option>
                        <option value="DELIVERED">Хүргэгдсэн</option>
                    </select>
                </div>
            </div>

            <p className="text-gray-600 mb-6">
                ({filteredOrders.length} захиалга)
            </p>

            {filteredOrders.length > 0 ? (
                <div className="space-y-4">
                    {filteredOrders.map((order) => (
                        <div
                            key={order.id}
                            className="bg-white rounded-lg shadow border p-6"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Package className="w-5 h-5 text-gray-500" />
                                        <h3 className="font-semibold">
                                            Захиалга #{order.id}
                                        </h3>
                                        <span
                                            className={`px-2 py-1 rounded text-xs ${getStatusColor(order.status)}`}
                                        >
                                            {getStatusText(order.status)}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {new Date(
                                                order.createdAt,
                                            ).toLocaleDateString('mn-MN')}
                                        </div>{' '}
                                        <div>
                                            {order.items?.length || 0} бараа
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-bold text-gray-900">
                                        {order.total.toLocaleString()}₮
                                    </p>
                                    <Link
                                        href={`/account/order/${order.id}`}
                                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm mt-1"
                                    >
                                        <Eye className="w-4 h-4" />
                                        Дэлгэрэнгүй
                                    </Link>
                                </div>
                            </div>
                            {/* Order Items Preview */}{' '}
                            <div className="border-t pt-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {order.items?.slice(0, 3).map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center gap-3 text-sm"
                                        >
                                            <img
                                                src={item.product.imageUrl}
                                                alt={item.product.name}
                                                className="w-10 h-10 object-cover rounded"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-gray-900 truncate">
                                                    {item.product.name}
                                                </p>
                                                <p className="text-gray-600">
                                                    {item.quantity} ×{' '}
                                                    {(
                                                        item.price /
                                                        item.quantity
                                                    ).toLocaleString()}
                                                    ₮
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                    {(order.items?.length || 0) > 3 && (
                                        <div className="flex items-center justify-center text-sm text-gray-500">
                                            +{order.items.length - 3} бараа
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {statusFilter === 'ALL'
                            ? 'Захиалга байхгүй байна'
                            : `${getStatusText(statusFilter)} захиалга байхгүй байна`}
                    </h3>
                    <p className="text-gray-600 mb-4">
                        Та одоогоор захиалга хийгээгүй байна
                    </p>
                    <a
                        href="/shop"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Дэлгүүр үзэх
                    </a>
                </div>
            )}
        </div>
    );
};

export default OrderPage;
