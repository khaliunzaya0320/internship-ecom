'use client';

import { useState, useEffect } from 'react';
import {
    Plus,
    Edit,
    Trash2,
    Tag,
    Search,
    Star,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';

interface Category {
    id: number;
    name: string;
    description?: string;
    imageUrl?: string;
    featured?: boolean;
    _count: {
        products: number;
    };
}

const AdminCategoryPage = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [filteredCategories, setFilteredCategories] = useState<Category[]>(
        [],
    );
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<Category | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Form states
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        imageUrl: '',
        featured: false,
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        // Filter categories based on search term
        const filtered = categories.filter(
            (category) =>
                category.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                (category.description &&
                    category.description
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())),
        );
        setFilteredCategories(filtered);
        setCurrentPage(1); // Reset to first page when filtering
    }, [categories, searchTerm]);

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/admin/category');
            if (response.ok) {
                const data = await response.json();
                setCategories(data);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const url = editing
                ? `/api/admin/category/${editing.id}`
                : '/api/admin/category';
            const method = editing ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                await fetchCategories();
                setShowModal(false);
                resetForm();
            } else {
                const errorData = await response.json();
                alert(errorData.error || 'Failed to save category');
            }
        } catch (error) {
            console.error('Error saving category:', error);
            alert('Error saving category');
        }
    };

    const handleEdit = (category: Category) => {
        setEditing(category);
        setFormData({
            name: category.name,
            description: category.description || '',
            imageUrl: category.imageUrl || '',
            featured: category.featured || false,
        });
        setShowModal(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Энэ ангиллыг устгахдаа итгэлтэй байна уу?')) {
            return;
        }

        try {
            const response = await fetch(`/api/admin/category/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                await fetchCategories();
            } else {
                const errorData = await response.json();
                alert(errorData.error || 'Failed to delete category');
            }
        } catch (error) {
            console.error('Error deleting category:', error);
            alert('Error deleting category');
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            imageUrl: '',
            featured: false,
        });
        setEditing(null);
    };

    const openNewCategoryModal = () => {
        resetForm();
        setShowModal(true);
    };

    // Pagination calculations
    const totalItems = filteredCategories.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentCategories = filteredCategories.slice(startIndex, endIndex);

    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        const start = Math.max(
            1,
            currentPage - Math.floor(maxVisiblePages / 2),
        );
        const end = Math.min(totalPages, start + maxVisiblePages - 1);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    if (loading) {
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
                    Ангилал удирдах
                </h1>
                <button
                    onClick={openNewCategoryModal}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 w-full sm:w-auto justify-center"
                >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Ангилал нэмэх</span>
                    <span className="sm:hidden">Нэмэх</span>
                </button>
            </div>

            {/* Search and Stats */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="relative flex-1 w-full sm:max-w-md">
                        <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Ангилал хайх..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Tag className="w-4 h-4" />
                        <span>Нийт: {filteredCategories.length} ангилал</span>
                    </div>
                </div>
            </div>

            {/* Categories Table - Mobile: Cards, Desktop: Table */}
            <div className="bg-white rounded-lg shadow-md">
                {/* Desktop Table View */}
                <div className="hidden lg:block overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Ангилал
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Тайлбар
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Бүтээгдэхүүн
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Төлөв
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Үйлдэл
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentCategories.map((category) => (
                                <tr
                                    key={category.id}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            {category.imageUrl ? (
                                                <img
                                                    src={category.imageUrl}
                                                    alt={category.name}
                                                    className="h-10 w-10 rounded-lg object-cover mr-4"
                                                />
                                            ) : (
                                                <div className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center mr-4">
                                                    <Tag className="w-5 h-5 text-gray-400" />
                                                </div>
                                            )}
                                            <div>
                                                <div className="text-sm font-medium text-gray-900 flex items-center">
                                                    {category.name}
                                                    {category.featured && (
                                                        <Star className="w-4 h-4 text-yellow-500 fill-current ml-2" />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-500 max-w-xs truncate">
                                            {category.description || '-'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-900">
                                            {category._count.products}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {category.featured ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                Онцгой
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                Энгийн
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end space-x-2">
                                            <button
                                                onClick={() =>
                                                    handleEdit(category)
                                                }
                                                className="text-blue-600 hover:text-blue-900 p-1"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(category.id)
                                                }
                                                className="text-red-600 hover:text-red-900 p-1"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card View */}
                <div className="lg:hidden">
                    <div className="p-4 space-y-4">
                        {currentCategories.map((category) => (
                            <div
                                key={category.id}
                                className="border border-gray-200 rounded-lg p-4"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center space-x-3 flex-1">
                                        {category.imageUrl ? (
                                            <img
                                                src={category.imageUrl}
                                                alt={category.name}
                                                className="h-12 w-12 rounded-lg object-cover"
                                            />
                                        ) : (
                                            <div className="h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center">
                                                <Tag className="w-6 h-6 text-gray-400" />
                                            </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center">
                                                <h3 className="text-sm font-medium text-gray-900 truncate">
                                                    {category.name}
                                                </h3>
                                                {category.featured && (
                                                    <Star className="w-4 h-4 text-yellow-500 fill-current ml-2" />
                                                )}
                                            </div>
                                            {category.description && (
                                                <p className="text-sm text-gray-500 truncate mt-1">
                                                    {category.description}
                                                </p>
                                            )}
                                            <div className="flex items-center space-x-4 mt-2">
                                                <span className="text-xs text-gray-500">
                                                    {category._count.products}{' '}
                                                    бүтээгдэхүүн
                                                </span>
                                                {category.featured ? (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                        Онцгой
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                        Энгийн
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2 ml-4">
                                        <button
                                            onClick={() => handleEdit(category)}
                                            className="text-blue-600 hover:text-blue-900 p-1"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(category.id)
                                            }
                                            className="text-red-600 hover:text-red-900 p-1"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Empty State */}
                {currentCategories.length === 0 && (
                    <div className="text-center py-12">
                        <Tag className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            {searchTerm
                                ? 'Ангилал олдсонгүй'
                                : 'Ангилал байхгүй'}
                        </h3>
                        <p className="text-gray-500">
                            {searchTerm
                                ? 'Өөр түлхүүр үг ашиглан хайж үзээрэй.'
                                : 'Эхний ангиллаа үүсгэж эхлээрэй.'}
                        </p>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                        <div className="flex flex-col sm:flex-row items-center justify-between">
                            <div className="text-sm text-gray-700 mb-4 sm:mb-0">
                                <span>Үзүүлж байна </span>
                                <span className="font-medium">
                                    {startIndex + 1}
                                </span>
                                <span> - </span>
                                <span className="font-medium">
                                    {Math.min(endIndex, totalItems)}
                                </span>
                                <span> нийт </span>
                                <span className="font-medium">
                                    {totalItems}
                                </span>
                                <span> ангиллаас</span>
                            </div>

                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() =>
                                        setCurrentPage(
                                            Math.max(1, currentPage - 1),
                                        )
                                    }
                                    disabled={currentPage === 1}
                                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </button>

                                {getPageNumbers().map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                            currentPage === page
                                                ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                        }`}
                                    >
                                        {page}
                                    </button>
                                ))}

                                <button
                                    onClick={() =>
                                        setCurrentPage(
                                            Math.min(
                                                totalPages,
                                                currentPage + 1,
                                            ),
                                        )
                                    }
                                    disabled={currentPage === totalPages}
                                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <h2 className="text-lg font-semibold mb-4">
                                {editing
                                    ? 'Ангилал засах'
                                    : 'Шинэ ангилал нэмэх'}
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Нэр *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                name: e.target.value,
                                            })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Тайлбар
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                description: e.target.value,
                                            })
                                        }
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Зургийн URL
                                    </label>
                                    <input
                                        type="url"
                                        value={formData.imageUrl}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                imageUrl: e.target.value,
                                            })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="featured"
                                        checked={formData.featured}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                featured: e.target.checked,
                                            })
                                        }
                                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    />
                                    <label
                                        htmlFor="featured"
                                        className="ml-2 text-sm text-gray-700"
                                    >
                                        Онцгой ангилал
                                    </label>
                                </div>
                                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                                    >
                                        {editing ? 'Засах' : 'Нэмэх'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                                    >
                                        Цуцлах
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCategoryPage;
