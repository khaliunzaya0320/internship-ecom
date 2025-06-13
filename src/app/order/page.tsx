"use client";

import { useState } from "react";
import { Search, Package, Calendar, MapPin, Truck } from "lucide-react";
import Link from "next/link";

const OrderTrackingPage = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderNumber.trim()) {
      setIsSearching(true);
      // Redirect to order detail page
      window.location.href = `/order/${orderNumber.trim()}`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Package className="w-16 h-16 mx-auto text-blue-600 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Захиалга хайх
          </h1>
          <p className="text-lg text-gray-600">
            Захиалгын дугаараа оруулж илгээлтийн явцыг хянаарай
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Захиалгын дугаар
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="orderNumber"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="Жишээ: 12345"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                  required
                />
                <Search className="absolute right-3 top-3 w-6 h-6 text-gray-400" />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isSearching || !orderNumber.trim()}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg font-medium"
            >
              {isSearching ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Хайж байна...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Захиалга хайх
                </>
              )}
            </button>
          </form>
        </div>

        {/* Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Calendar className="w-12 h-12 mx-auto text-green-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              24/7 Хяналт
            </h3>
            <p className="text-gray-600">
              Захиалгын явцыг хэзээ ч хянах боломжтой
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Truck className="w-12 h-12 mx-auto text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Хурдан хүргэлт
            </h3>
            <p className="text-gray-600">
              Улаанбаатар хотод 1-2 хоногт хүргэнэ
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <MapPin className="w-12 h-12 mx-auto text-purple-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Байршил хянах
            </h3>
            <p className="text-gray-600">
              Захиалгын одоогийн байршлыг харах
            </p>
          </div>
        </div>

        {/* Additional Links */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Бусад үйлчилгээ
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/account/order"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <Package className="w-6 h-6 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">Нэвтэрч орох</p>
                <p className="text-sm text-gray-600">Бүх захиалгаа харах</p>
              </div>
            </Link>
            
            <Link
              href="/shop"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <Search className="w-6 h-6 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">Дэлгүүр үзэх</p>
                <p className="text-sm text-gray-600">Шинэ бүтээгдэхүүн олох</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingPage;
