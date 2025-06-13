'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Order } from '@/types';
import { ArrowLeft, Package, Clock, CheckCircle } from 'lucide-react';

const OrderDetailPage = () => {
    const params = useParams();
    const router = useRouter();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (params.id) {
            fetchOrderDetail();
        }
    }, [params.id]);

    const fetchOrderDetail = async () => {
        try {
            const res = await fetch(`/api/order/detail/${params.id}`);
            if (res.ok) {
                const data = await res.json();
                setOrder(data);
            } else {
                setError('Захиалга олдсонгүй');
            }
        } catch (error) {
            setError('Серверийн алдаа');
        } finally {
            setLoading(false);
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'PENDING':
                return <Clock className="w-5 h-5 text-yellow-500" />;
            case 'DELIVERED':
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            default:
                return <Package className="w-5 h-5 text-gray-500" />;
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

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-96">
                <div className="text-gray-500">Ачааллаж байна...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="m-6">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="m-6">
                <div className="text-center text-gray-500">
                    Захиалга олдсонгүй
                </div>
            </div>
        );
    }

    return (
        <div className="m-6 max-w-4xl">
            {/* Header */}
            <div className="flex items-center mb-6">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mr-4"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Буцах
                </button>
                <h1 className="text-2xl font-bold">Захиалгын дэлгэрэнгүй</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Order Info */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold">
                                Захиалгын мэдээлэл
                            </h2>
                            <div className="flex items-center gap-2">
                                {getStatusIcon(order.status)}
                                <span className="font-medium">
                                    {getStatusText(order.status)}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                                <p className="text-sm text-gray-600">
                                    Захиалгын дугаар
                                </p>
                                <p className="font-medium">#{order.id}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Огноо</p>
                                <p className="font-medium">
                                    {new Date(
                                        order.createdAt,
                                    ).toLocaleDateString('mn-MN')}
                                </p>
                            </div>
                        </div>

                        {/* Order Items */}
                        <h3 className="text-lg font-semibold mb-4">
                            Захиалсан бараа
                        </h3>
                        <div className="space-y-4">
                            {order.items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-4 p-4 border rounded-lg"
                                >
                                    <img
                                        src={item.product.imageUrl}
                                        alt={item.product.name}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <h4 className="font-medium">
                                            {item.product.name}
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            {item.product.category.name}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Тоо ширхэг: {item.quantity}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium">
                                            {item.price.toLocaleString()}₮
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {item.quantity} ×{' '}
                                            {(
                                                item.price / item.quantity
                                            ).toLocaleString()}
                                            ₮
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="space-y-6">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold mb-4">
                            Төлбөрийн мэдээлэл
                        </h3>

                        <div className="space-y-2 mb-4">
                            {order.items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex justify-between text-sm"
                                >
                                    <span>
                                        {item.product.name} × {item.quantity}
                                    </span>
                                    <span>{item.price.toLocaleString()}₮</span>
                                </div>
                            ))}
                        </div>

                        <div className="border-t pt-4">
                            <div className="flex justify-between font-semibold text-lg">
                                <span>Нийт дүн</span>
                                <span className="text-rose-600">
                                    {order.total.toLocaleString()}₮
                                </span>
                            </div>
                        </div>
                    </div>

                    {order.user && (
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold mb-4">
                                Захиалагчийн мэдээлэл
                            </h3>
                            <div className="space-y-2">
                                <div>
                                    <p className="text-sm text-gray-600">Нэр</p>
                                    <p className="font-medium">
                                        {order.user.name}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">
                                        Имэйл
                                    </p>
                                    <p className="font-medium">
                                        {order.user.email}
                                    </p>
                                </div>
                                {order.user.phone && (
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            Утас
                                        </p>
                                        <p className="font-medium">
                                            {order.user.phone}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderDetailPage;
