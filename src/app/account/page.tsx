"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { DashboardStats } from "@/types";
import { Package, Heart, Eye, CreditCard } from "lucide-react";

const AccountPage = () => {
  const { data: session } = useSession();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const res = await fetch('/api/dashboard');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="m-6">
        <div className="text-center text-gray-500">Ачааллаж байна...</div>
      </div>
    );
  }

  return (
    <div className="m-6 w-full">
      <h1 className="primary-header mb-6">
        Сайн байна уу, {session?.user?.name}!
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Link href="/account/order" className="block">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <Package className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Нийт захиалга</p>
                <p className="text-2xl font-bold">{stats?.totalOrders || 0}</p>
              </div>
            </div>
          </div>
        </Link>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <CreditCard className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Нийт зарцуулсан</p>
              <p className="text-2xl font-bold">{stats?.totalSpent.toLocaleString() || 0}₮</p>
            </div>
          </div>
        </div>

        <Link href="/account/wishlist" className="block">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <Heart className="w-8 h-8 text-red-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Хадгалсан бараа</p>
                <p className="text-2xl font-bold">{stats?.wishlistCount || 0}</p>
              </div>
            </div>
          </div>
        </Link>

        <Link href="/account/view" className="block">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <Eye className="w-8 h-8 text-purple-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Үзсэн бараа</p>
                <p className="text-2xl font-bold">{stats?.viewedProductsCount || 0}</p>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Сүүлийн захиалгууд</h2>
          <Link href="/account/order" className="text-blue-600 hover:underline">
            Бүгдийг харах
          </Link>
        </div>

        {stats?.recentOrders && stats.recentOrders.length > 0 ? (
          <div className="space-y-4">
            {stats.recentOrders.map((order) => (
              <Link 
                key={order.id} 
                href={`/account/order/${order.id}`}
                className="block"
              >
                <div className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div>
                    <p className="font-medium">Захиалга #{order.id}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString('mn-MN')}
                    </p>
                    <p className="text-sm text-gray-600">
                      {order.items.length} бараа
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{order.total.toLocaleString()}₮</p>
                    <span className={`inline-block px-2 py-1 rounded text-xs ${
                      order.status === 'DELIVERED' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status === 'DELIVERED' ? 'Хүргэгдсэн' : 'Хүлээгдэж буй'}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Package className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p>Захиалга байхгүй байна</p>
            <Link href="/shop" className="text-blue-600 hover:underline mt-2 inline-block">
              Дэлгүүр үзэх
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
