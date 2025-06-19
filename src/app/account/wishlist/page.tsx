'use client';
import { useState, useEffect } from 'react';
import { Wishlist } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, XCircle } from 'lucide-react';
import { toast } from 'react-toastify';


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

    const handleRemoveFromWishlist = async (wishlistItemId: number, productName: string) => {
        try {
            const res = await fetch(`/api/wishlist/${wishlistItemId}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                setWishlist((prevWishlist) =>
                    prevWishlist.filter((item) => item.id !== wishlistItemId)
                );
                toast.info(`${productName} хүслийн жагсаалтаас хасагдлаа.`);
            } else {
                toast.error(`${productName}-г хүслийн жагсаалтаас хасаж чадсангүй.`);
            }
        } catch (error) {
            console.error('Failed to remove from wishlist:', error);
            toast.error("Барааг устгахад алдаа гарлаа.");
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
        <div className="m-6 max-w-full">
            <h1 className="primary-header mb-4">Хадгалсан бүтээгдэхүүн</h1>

            <p className="text-gray-600 mb-6">
                ({wishlist.length} бараа)
            </p>

            {wishlist.length > 0 ? (
                <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 ">
                    {wishlist.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-md shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden group w-48 relative"
                        >
                            <div className='relative h-48 overflow-hidden'>
                                <Image
                                    src={item.product.imageUrl}
                                    alt={item.product.name}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                {item.product.stock <= 0 && (
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                        <span className="text-white text-sm font-medium">Бараа дууссан!</span>
                                    </div>
                                )}
                                <button
                                    onClick={() => handleRemoveFromWishlist(item.id, item.product.name)}
                                    className="absolute top-2 right-2 p-1 m-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 hover:bg-red-600 "
                                    title="Хүслийн жагсаалтаас хасах"
                                >
                                    <XCircle className="h-6 w-6" />
                                </button>
                            </div>
                            <Link href={`/shop/product/${item.product.id}`} className='flex flex-col items-center p-2'>
                                {/* Энд өөрчлөлт хийсэн: truncate болон flex flex-wrap-ийг авч хаясан, text-center нэмсэн */}
                                <h3 className="font-semibold text-sm text-gray-800 hover:text-blue-700 transition-colors duration-200 text-center">
                                    {item.product.name}
                                </h3>
                                <div className="flex items-baseline justify-between mt-2">
                                    <span className="text-sm font-bold text-rose-600">
                                        {item.product.price.toLocaleString()}₮
                                    </span>
                                </div>
                            </Link>

                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col justify-center items-center w-4/5 py-12 gap-4">
                    <Heart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Хадгалсан бараа байхгүй байна
                    </h3>
                    <a
                        href="/shop"
                        className="default-button"
                    >
                        Дэлгүүр үзэх
                    </a>
                </div>
            )}
        </div>
    );
};

export default WishlistPage;