'use client';

import { useState, useEffect } from 'react';
import { Wishlist } from '@/types';
import ProductCard from '@/components/ProductCard';
import { Heart } from 'lucide-react';

const WishlistPage = () => {
    const [wishlist, setWishlist] = useState<Wishlist[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWishlist();
    }, []);

    const fetchWishlist = async () => {
        try {
            const res = await fetch('/api/wishlist');
            if (res.ok) {
                const data = await res.json();
                setWishlist(data);
            }
        } catch (error) {
            console.error('Failed to fetch wishlist:', error);
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
        <div className="m-6">
            <h1 className="primary-header mb-4">Хадгалсан бүтээгдэхүүн</h1>

            <p className="text-gray-600 mb-6">({wishlist.length} бараа)</p>

            {wishlist.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {wishlist.map((item) => (
                        <ProductCard
                            key={item.id}
                            product={item.product}
                            isLiked={true}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <Heart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Хадгалсан бараа байхгүй байна
                    </h3>
                    <p className="text-gray-600 mb-4">
                        Таны дуртай бүтээгдэхүүнүүдийг энд хадгалж болно
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

export default WishlistPage;
