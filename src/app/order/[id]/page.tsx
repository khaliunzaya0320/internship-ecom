"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Order } from "@/types";
import { Package, Calendar, MapPin, User, Phone, CreditCard, ArrowLeft, CheckCircle, Clock, Truck } from "lucide-react";
import Link from "next/link";

const PublicOrderDetailPage = () => {
  const params = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      fetchOrderDetail(params.id as string);
    }
  }, [params.id]);

  const fetchOrderDetail = async (orderId: string) => {
    try {
      const res = await fetch(`/api/order/public/${orderId}`);
      if (res.ok) {
        const data = await res.json();
        setOrder(data);
      } else if (res.status === 404) {
        setError("Захиалга олдсонгүй. Захиалгын дугаараа шалгаад дахин оролдоно уу.");
      } else {
        setError("Алдаа гарлаа. Дахин оролдоно уу.");
      }
    } catch (error) {
      console.error("Failed to fetch order:", error);
      setError("Интернэт холболтыг шалгаад дахин оролдоно уу.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "PENDING":
        return { 
          text: "Боловсруулж байна", 
          color: "text-yellow-600 bg-yellow-100",
          icon: <Clock className="w-5 h-5" />
        };
      case "DELIVERED":
        return { 
          text: "Хүргэгдсэн", 
          color: "text-green-600 bg-green-100",
          icon: <CheckCircle className="w-5 h-5" />
        };      case "SHIPPED":
        return { 
          text: "Хүргэлтэнд", 
          color: "text-blue-600 bg-blue-100",
          icon: <Truck className="w-5 h-5" />
        };
      default:
        return { 
          text: status, 
          color: "text-gray-600 bg-gray-100",
          icon: <Clock className="w-5 h-5" />
        };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Захиалгын мэдээлэл ачааллаж байна...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
          <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Захиалга олдсонгүй
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <Link
              href="/order"
              className="block w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Дахин хайх
            </Link>
            <Link
              href="/shop"
              className="block w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200"
            >
              Дэлгүүр үзэх
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  const statusInfo = getStatusInfo(order.status);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/order"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Буцах
          </Link>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Захиалга #{order.id}
                </h1>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(order.createdAt).toLocaleDateString('mn-MN')}
                  </div>
                  <div className="flex items-center gap-1">
                    <Package className="w-4 h-4" />
                    {order.items?.length || 0} бараа
                  </div>
                </div>
              </div>
              
              <div className="mt-4 sm:mt-0">
                <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium ${statusInfo.color}`}>
                  {statusInfo.icon}
                  {statusInfo.text}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Захиалсан бараа
              </h2>
              
              <div className="space-y-4">
                {order.items?.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Тоо хэмжээ: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-600">
                        Нэгж үнэ: {(item.price / item.quantity).toLocaleString()}₮
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {item.price.toLocaleString()}₮
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Order Total */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Нийт дүн:</span>
                  <span className="text-blue-600">{order.total.toLocaleString()}₮</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Info Sidebar */}
          <div className="space-y-6">
            {/* Delivery Status */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Хүргэлтийн мэдээлэл
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  {statusInfo.icon}
                  <div>
                    <p className="font-medium text-gray-900">{statusInfo.text}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleString('mn-MN')}
                    </p>
                  </div>
                </div>
                
                {order.status === "PENDING" && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-sm text-yellow-800">
                      Таны захиалгыг боловсруулж байна. Удахгүй хүргэлтэнд гарах болно.
                    </p>
                  </div>
                )}
                  {order.status === "SHIPPED" && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-800">
                      Таны захиалга хүргэлтэнд гарсан. Удахгүй хүрэх болно.
                    </p>
                  </div>
                )}
                
                {order.status === "DELIVERED" && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-sm text-green-800">
                      Таны захиалга амжилттай хүргэгдлээ. Баярлалаа!
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Холбоо барих
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Утас</p>
                    <p className="font-medium">+976 7777-7777</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Хаяг</p>
                    <p className="font-medium">Улаанбаатар хот</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Үйлдэл
              </h3>
              
              <div className="space-y-3">
                <Link
                  href="/account/order"
                  className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700"
                >
                  Бүх захиалга харах
                </Link>
                
                <Link
                  href="/shop"
                  className="block w-full bg-gray-100 text-gray-700 text-center py-2 px-4 rounded-lg hover:bg-gray-200"
                >
                  Дэлгүүр үзэх
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicOrderDetailPage;
