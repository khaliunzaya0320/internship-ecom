'use client';

import { useState, useEffect } from 'react';
import {
    Search,
    Filter,
    Users,
    Mail,
    Phone,
    ShoppingBag,
    Heart,
    ShoppingCart,
    ChevronLeft,
    ChevronRight,
    User as UserIcon,
} from 'lucide-react';
import Link from 'next/link';
import { User, UsersResponse } from '@/types';

const AdminUserPage = () => {
    const [usersData, setUsersData] = useState<UsersResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchUsers();
    }, [currentPage, roleFilter, searchTerm]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams({
                page: currentPage.toString(),
                limit: '20',
            });

            if (roleFilter !== 'all') {
                params.append('role', roleFilter);
            }

            if (searchTerm.trim()) {
                params.append('search', searchTerm.trim());
            }

            const response = await fetch(`/api/admin/user?${params}`);
            if (response.ok) {
                const data = await response.json();
                setUsersData(data);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const getRoleColor = (role: string) => {
        return role === 'ADMIN'
            ? 'bg-purple-100 text-purple-800'
            : 'bg-blue-100 text-blue-800';
    };

    const handleSearch = () => {
        setCurrentPage(1);
        fetchUsers();
    };

    if (loading && !usersData) {
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
                    Хэрэглэгч удирдах
                </h1>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>
                        Нийт: {usersData?.pagination.total || 0} хэрэглэгч
                    </span>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="relative sm:col-span-2">
                        <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Нэр, имэйл эсвэл утас хайх..."
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
                            value={roleFilter}
                            onChange={(e) => {
                                setRoleFilter(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                        >
                            <option value="all">Бүх эрх</option>
                            <option value="USER">Хэрэглэгч</option>
                            <option value="ADMIN">Админ</option>
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

            {/* Users - Desktop: Table, Mobile: Cards */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Desktop Table View */}
                <div className="hidden lg:block overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Хэрэглэгч
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Холбоо барих
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Эрх
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Захиалга
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Сагс
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Хадгалсан
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Нийт зарцуулсан
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Үйлдэл
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {usersData?.users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                                    <Users className="w-5 h-5 text-gray-600" />
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {user.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    #{user.id}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            <div className="flex items-center mb-1">
                                                <Mail className="w-4 h-4 mr-2 text-gray-400" />
                                                {user.email}
                                            </div>
                                            {user.phone && (
                                                <div className="flex items-center">
                                                    <Phone className="w-4 h-4 mr-2 text-gray-400" />
                                                    {user.phone}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}
                                        >
                                            {user.role === 'ADMIN'
                                                ? 'Админ'
                                                : 'Хэрэглэгч'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center text-sm text-gray-900">
                                            <ShoppingBag className="w-4 h-4 mr-1 text-gray-400" />
                                            {user._count?.orders || 0} захиалга
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center text-sm text-gray-900">
                                            <ShoppingCart className="w-4 h-4 mr-1 text-gray-400" />
                                            {user._count?.cartItems || 0} бараа
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center text-sm text-gray-900">
                                            <Heart className="w-4 h-4 mr-1 text-gray-400" />
                                            {user._count?.wishlist || 0} бараа
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-semibold text-gray-900">
                                            {(
                                                user.totalSpent || 0
                                            ).toLocaleString()}₮
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link
                                            href={`/admin/user/${user.id}`}
                                            className="text-blue-600 hover:text-blue-900"
                                        >
                                            Харах
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card View */}
                <div className="lg:hidden">
                    <div className="p-4 space-y-4">
                        {usersData?.users.map((user) => (
                            <div
                                key={user.id}
                                className="border border-gray-200 rounded-lg p-4"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center space-x-3 flex-1">
                                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                            <UserIcon className="w-6 h-6 text-gray-400" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center space-x-2">
                                                <h3 className="text-sm font-medium text-gray-900 truncate">
                                                    {user.name}
                                                </h3>
                                                <span
                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(
                                                        user.role,
                                                    )}`}
                                                >
                                                    {user.role === 'ADMIN'
                                                        ? 'Админ'
                                                        : 'Хэрэглэгч'}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-500 truncate">
                                                {user.email}
                                            </p>
                                            {user.phone && (
                                                <p className="text-xs text-gray-500">
                                                    {user.phone}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <Link
                                        href={`/admin/user/${user.id}`}
                                        className="text-blue-600 hover:text-blue-900 text-sm font-medium ml-4"
                                    >
                                        Харах
                                    </Link>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="flex items-center space-x-1">
                                        <ShoppingBag className="w-4 h-4 text-gray-400" />
                                        <span className="text-gray-600">
                                            {user._count?.orders || 0} захиалга
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <ShoppingCart className="w-4 h-4 text-gray-400" />
                                        <span className="text-gray-600">
                                            {user._count?.cartItems || 0} сагс
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Heart className="w-4 h-4 text-gray-400" />
                                        <span className="text-gray-600">
                                            {user._count?.wishlist || 0} хүсэл
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="font-semibold text-gray-900">
                                            ₮
                                            {(
                                                user.totalSpent || 0
                                            ).toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-3 pt-3 border-t border-gray-100">
                                    <span className="text-xs text-gray-500">
                                        Бүртгүүлсэн:{' '}
                                        {user.createdAt
                                            ? new Date(
                                                  user.createdAt,
                                              ).toLocaleDateString('mn-MN')
                                            : 'Тодорхойгүй'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Pagination */}
            {usersData && usersData.pagination.pages > 1 && (
                <div className="flex items-center justify-between bg-white px-6 py-3 rounded-lg shadow-md">
                    <div className="flex items-center text-sm text-gray-700">
                        <span>
                            Нийт {usersData.pagination.total} хэрэглэгчээс{' '}
                            {(usersData.pagination.page - 1) *
                                usersData.pagination.limit +
                                1}
                            -
                            {Math.min(
                                usersData.pagination.page *
                                    usersData.pagination.limit,
                                usersData.pagination.total,
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
                            {currentPage} / {usersData.pagination.pages}
                        </span>
                        <button
                            onClick={() =>
                                setCurrentPage(
                                    Math.min(
                                        usersData.pagination.pages,
                                        currentPage + 1,
                                    ),
                                )
                            }
                            disabled={
                                currentPage === usersData.pagination.pages
                            }
                            className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}

            {usersData?.users.length === 0 && (
                <div className="text-center py-12">
                    <Users className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Хэрэглэгч олдсонгүй
                    </h3>
                    <p className="text-gray-500">
                        Таны хайлтад тохирох хэрэглэгч байхгүй байна.
                    </p>
                </div>
            )}
        </div>
    );
};

export default AdminUserPage;
