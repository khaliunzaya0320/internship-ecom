'use client';

import { useState, useEffect } from 'react';
import { ViewedProduct } from '@/types';
import ProductCard from '@/components/ProductCard';
import { Eye } from 'lucide-react';

const ViewedProductsPage = () => {
    const [viewedProducts, setViewedProducts] = useState<ViewedProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchViewedProducts();
    }, []);

    const fetchViewedProducts = async () => {
        try {
            const res = await fetch('/api/viewed-products');
            if (res.ok) {
                const data = await res.json();
                setViewedProducts(data);
            }
        } catch (error) {
            console.error('Failed to fetch viewed products:', error);
        } finally {
            setLoading(false);
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
        <div className="m-6 min-w-full">
            <h1 className="primary-header mb-4">Үзсэн бүтээгдэхүүн</h1>

            <p className="text-gray-600 mb-6">
                ({viewedProducts.length} бараа)
            </p>

            {viewedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                    {viewedProducts.map((item) => (
                        <div
                            key={`${item.userId}-${item.productId}`}
                            className="relative"
                        >
                            <ProductCard product={item.product} />
                            <div className="absolute top-2 right-2 bg-white bg-opacity-90 rounded-full p-1">
                                <span className="text-xs text-gray-600">
                                    {new Date(item.viewedAt).toLocaleDateString(
                                        'mn-MN',
                                    )}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col justify-center items-center w-4/5 py-12 gap-4">
                    <Eye className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Үзсэн бараа байхгүй байна
                    </h3>
                    <p className="text-gray-600 mb-4">
                        Та барааны дэлгэрэнгүй мэдээллийг үзэх үед энд харагдана
                    </p>
                    <a
                        href="/shop"
                        className="default-button">
                        Дэлгүүр үзэх
                    </a>
                </div>               
            )}
        </div>
    );
};

export default ViewedProductsPage;
