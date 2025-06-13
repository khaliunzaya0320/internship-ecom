'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
    Search,
    Filter,
    SlidersHorizontal,
    Grid,
    List,
    ChevronDown,
} from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import QuickViewModal from '@/components/QuickViewModal';
import { Product, Category } from '@/types';

interface ProductsResponse {
    products: Product[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalCount: number;
        hasMore: boolean;
        limit: number;
    };
}

const ProductsPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    // Filter states
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [inStock, setInStock] = useState(false);
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('desc');
    // UI states
    const [showFilters, setShowFilters] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [quickViewProductId, setQuickViewProductId] = useState<number | null>(
        null,
    );
    const [showQuickView, setShowQuickView] = useState(false);

    const observer = useRef<IntersectionObserver | null>(null);
    const lastProductElementRef = useCallback(
        (node: HTMLDivElement) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prevPage) => prevPage + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, hasMore],
    );

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/category');
                if (response.ok) {
                    const data = await response.json();
                    setCategories(data);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    // Fetch products
    const fetchProducts = useCallback(
        async (pageNum: number, reset = false) => {
            if (loading) return;

            setLoading(true);

            try {
                const params = new URLSearchParams({
                    page: pageNum.toString(),
                    limit: '12',
                    sortBy,
                    sortOrder,
                });

                if (searchTerm) params.append('search', searchTerm);
                if (selectedCategory)
                    params.append('categoryId', selectedCategory);
                if (minPrice) params.append('minPrice', minPrice);
                if (maxPrice) params.append('maxPrice', maxPrice);
                if (inStock) params.append('inStock', 'true');

                const response = await fetch(`/api/products?${params}`);
                if (response.ok) {
                    const data: ProductsResponse = await response.json();

                    if (reset) {
                        setProducts(data.products);
                    } else {
                        setProducts((prev) => [...prev, ...data.products]);
                    }

                    setHasMore(data.pagination.hasMore);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
                setInitialLoading(false);
            }
        },
        [
            searchTerm,
            selectedCategory,
            minPrice,
            maxPrice,
            inStock,
            sortBy,
            sortOrder,
            loading,
        ],
    );

    // Initial load
    useEffect(() => {
        fetchProducts(1, true);
        setPage(1);
    }, [
        searchTerm,
        selectedCategory,
        minPrice,
        maxPrice,
        inStock,
        sortBy,
        sortOrder,
    ]);

    // Load more when page changes
    useEffect(() => {
        if (page > 1) {
            fetchProducts(page);
        }
    }, [page, fetchProducts]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Search is already handled by the useEffect dependency
    };
    const clearFilters = () => {
        setSearchTerm('');
        setSelectedCategory('');
        setMinPrice('');
        setMaxPrice('');
        setInStock(false);
        setSortBy('createdAt');
        setSortOrder('desc');
    };

    const handleQuickView = (productId: number) => {
        setQuickViewProductId(productId);
        setShowQuickView(true);
    };

    const closeQuickView = () => {
        setShowQuickView(false);
        setQuickViewProductId(null);
    };

    if (initialLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        All Products
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Discover our complete collection
                    </p>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-md transition-colors ${
                            viewMode === 'grid'
                                ? 'bg-white shadow-sm'
                                : 'hover:bg-gray-200'
                        }`}
                    >
                        <Grid className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-md transition-colors ${
                            viewMode === 'list'
                                ? 'bg-white shadow-sm'
                                : 'hover:bg-gray-200'
                        }`}
                    >
                        <List className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                {/* Search Bar */}
                <form onSubmit={handleSearch} className="mb-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </form>

                {/* Filter Toggle */}
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 mb-4"
                >
                    <Filter className="h-4 w-4" />
                    Filters & Sorting
                    <ChevronDown
                        className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`}
                    />
                </button>

                {/* Filters */}
                {showFilters && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
                        {/* Category Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category
                            </label>
                            <select
                                value={selectedCategory}
                                onChange={(e) =>
                                    setSelectedCategory(e.target.value)
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">All Categories</option>
                                {categories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id.toString()}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Price Range */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Price Range
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    placeholder="Min"
                                    value={minPrice}
                                    onChange={(e) =>
                                        setMinPrice(e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <input
                                    type="number"
                                    placeholder="Max"
                                    value={maxPrice}
                                    onChange={(e) =>
                                        setMaxPrice(e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Sort By */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Sort By
                            </label>
                            <select
                                value={`${sortBy}-${sortOrder}`}
                                onChange={(e) => {
                                    const [field, order] =
                                        e.target.value.split('-');
                                    setSortBy(field);
                                    setSortOrder(order);
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="createdAt-desc">
                                    Newest First
                                </option>
                                <option value="createdAt-asc">
                                    Oldest First
                                </option>
                                <option value="name-asc">Name A-Z</option>
                                <option value="name-desc">Name Z-A</option>
                                <option value="price-asc">
                                    Price Low to High
                                </option>
                                <option value="price-desc">
                                    Price High to Low
                                </option>
                            </select>
                        </div>

                        {/* Stock Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Availability
                            </label>
                            <div className="flex items-center gap-2 mt-4">
                                <input
                                    type="checkbox"
                                    id="inStock"
                                    checked={inStock}
                                    onChange={(e) =>
                                        setInStock(e.target.checked)
                                    }
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label
                                    htmlFor="inStock"
                                    className="text-sm text-gray-700"
                                >
                                    In Stock Only
                                </label>
                            </div>
                            <button
                                onClick={clearFilters}
                                className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Products Grid */}
            <div
                className={`grid gap-6 mb-8 ${
                    viewMode === 'grid'
                        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                        : 'grid-cols-1'
                }`}
            >
                {products.map((product, index) => {
                    if (products.length === index + 1) {
                        return (
                            <div ref={lastProductElementRef} key={product.id}>
                                <ProductCard
                                    product={product}
                                    viewMode={viewMode}
                                    onQuickView={handleQuickView}
                                />
                            </div>
                        );
                    } else {
                        return (
                            <ProductCard
                                key={product.id}
                                product={product}
                                viewMode={viewMode}
                                onQuickView={handleQuickView}
                            />
                        );
                    }
                })}
            </div>

            {/* Loading */}
            {loading && (
                <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
            )}

            {/* No products */}
            {!loading && products.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                        <Search className="mx-auto h-12 w-12" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No products found
                    </h3>
                    <p className="text-gray-600 mb-4">
                        Try adjusting your search criteria or filters.
                    </p>
                    <button
                        onClick={clearFilters}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Clear Filters
                    </button>
                </div>
            )}

            {/* End of results */}
            {!hasMore && products.length > 0 && (
                <div className="text-center py-8">
                    <p className="text-gray-600">
                        You've reached the end of the results{' '}
                    </p>
                </div>
            )}

            {/* Quick View Modal */}
            <QuickViewModal
                productId={quickViewProductId}
                isOpen={showQuickView}
                onClose={closeQuickView}
            />
        </div>
    );
};

export default ProductsPage;
