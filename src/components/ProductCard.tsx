'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useSession } from 'next-auth/react'; 
import { Eye, ShoppingCart, Package } from 'lucide-react';
import LikeButton from './LikeButton';
import { useCart } from '@/context/CartContext';
import { toast } from 'react-toastify';
import { Product } from '@/types';

export type ProductCardProps = {
    product: Product;
    isLiked?: boolean;
    wishlistItemId?: number;
    onWishlistChange?: () => void;
    onLikeToggle?: (productId: number) => void;
    viewMode?: 'grid' | 'list';
    onQuickView?: (productId: number) => void;
    // userId?: string | number; 
};

const ProductCard = ({
    product,
    isLiked = false,
    wishlistItemId,
    onWishlistChange,
    onLikeToggle, 
    viewMode = 'grid',
    onQuickView,
    // userId,
}: ProductCardProps) => {
    const [imageLoading, setImageLoading] = useState(true);
    const { addToCart } = useCart();
    const { data: session } = useSession(); 

    if (!product) return null;

    const isOutOfStock = product.stock <= 0;
    const isLowStock = product.stock > 0 && product.stock <= 5;

    const handleQuickView = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (onQuickView) {
            onQuickView(product.id);
        }
    };

    const handleAddToCart = () => {
        addToCart(product);
        toast.success(`${product.name} сагсанд нэмэгдлээ.`);
    };


    const handleLikeToggle = async () => {
        if (!session || !session.user || !session.user.id) {
            toast.error('Хүслийн жагсаалтад нэмэхийн тулд эхлээд нэвтэрнэ үү!');
            return;
        }

        const currentUserId = session.user.id;
        console.log('Current User ID:', currentUserId); 

        try {
            if (isLiked && wishlistItemId) {
                const res = await fetch(`/api/wishlist/${wishlistItemId}`, {
                    method: 'DELETE',
                });

                if (res.ok) {
                    toast.info(`${product.name} хүслийн жагсаалтаас хасагдлаа.`);
                    onWishlistChange?.(); 
                } else {
                    const errorData = await res.json();
                    console.error('Failed to remove from wishlist:', res.status, errorData);
                    toast.error(`${product.name}-г хасахад алдаа гарлаа: ${errorData.message || 'Үл мэдэгдэх алдаа'}`);
                }
            } else {
                const res = await fetch(`/api/wishlist`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        productId: product.id,
                        userId: currentUserId,
                    }),
                });

                if (res.ok) {
                    toast.success(`${product.name} хүслийн жагсаалтад нэмэгдлээ.`);
                    onWishlistChange?.(); 
                } else {
                    const errorData = await res.json();
                    console.error('Failed to add to wishlist:', res.status, errorData);
                    if (res.status === 409) {
                        toast.info(`${product.name} хүслийн жагсаалтад аль хэдийн байна.`);
                    } else if (res.status === 400) {
                        toast.error(`Дутуу мэдээлэл: ${errorData.error}`);
                    } else if (res.status === 404) {
                        toast.error(`Бүтээгдэхүүн эсвэл хэрэглэгч олдсонгүй.`);
                    } else {
                        toast.error(`Хүслийн жагсаалтад нэмэхэд алдаа гарлаа: ${errorData.message || 'Үл мэдэгдэх алдаа'}`);
                    }
                }
            }
        } catch (error) {
            console.error('Wishlist update error:', error);
            toast.error('Алдаа гарлаа. Дахин оролдоно уу.');
        }
    };

    if (viewMode === 'list') {
        return (
            <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6 min-w-64">
                <div className="flex gap-6">
                    {/* Image */}
                    <Link
                        href={`/shop/product/${product.id}`}
                        className="relative w-32 h-32 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0"
                    >
                        {imageLoading && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                            </div>
                        )}
                        <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            className={`object-contain transition-opacity duration-200 ${
                                imageLoading ? 'opacity-0' : 'opacity-100'
                            }`}
                            onLoad={() => setImageLoading(false)}
                        />
                        {isOutOfStock && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                <span className="text-white text-sm font-medium">
                                    Out of Stock
                                </span>
                            </div>
                        )}
                    </Link>

                    {/* Info */}
                    <div className="flex-grow">
                        <div className="flex justify-between items-start mb-1">
                            <Link href={`/shop/product/${product.id}`}>
                                <h3 className="font-semibold text-lg text-gray-800 hover:text-blue-600 transition-colors">
                                    {product.name}
                                </h3>
                            </Link>
                            <button onClick={handleLikeToggle} className="p-1">
                                <LikeButton isLiked={isLiked} />
                            </button>
                        </div>

                        <p className="text-sm text-gray-500 mb-1">
                            {product.category?.name ?? 'Ангилалгүй'}
                        </p>

                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                            {product.description}
                        </p>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-xl text-gray-900">
                                    {product.price.toLocaleString()}₮
                                </span>

                                {/* Stock Status */}
                                <div className="flex items-center gap-1">
                                    <Package className="h-4 w-4 text-gray-400" />
                                    <span
                                        className={`text-sm font-medium ${
                                            isOutOfStock
                                                ? 'text-red-600'
                                                : isLowStock
                                                ? 'text-orange-600'
                                                : 'text-green-600'
                                        }`}
                                    >
                                        {isOutOfStock
                                            ? 'Out of Stock'
                                            : isLowStock
                                            ? `Only ${product.stock} left`
                                            : `Үлдэгдэл: ${product.stock}`}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleQuickView}
                                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    title="Quick View"
                                >
                                    <Eye className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={handleAddToCart}
                                    disabled={isOutOfStock}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        isOutOfStock
                                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                            : 'bg-rose-500 text-white hover:bg-rose-600'
                                    }`}
                                >
                                    <ShoppingCart className="h-4 w-4 inline mr-2" />
                                    {isOutOfStock ? 'Unavailable' : 'Add to Cart'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Grid view
    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden group flex flex-col w-72">
            <div className="relative">
                {/* Image Container */}
                <Link
                    href={`/shop/product/${product.id}`}
                    className="relative block w-full h-64 bg-white overflow-hidden"
                >
                    {imageLoading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                        </div>
                    )}
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className={`absolute inset-0 object-contain transition-opacity duration-200 ${
                            imageLoading ? 'opacity-0' : 'opacity-100'
                        }`}
                        onLoad={() => setImageLoading(false)}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {isOutOfStock && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <span className="text-white text-sm font-medium">
                                Бүтээгдэхүүн дууссан
                            </span>
                        </div>
                    )}
                </Link>

                {/* Quick view and Like button */}
                <button
                    onClick={handleQuickView}
                    className="absolute top-2 right-2 p-2 bg-white/80 hover:bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                    title="Quick View"
                >
                    <Eye className="h-4 w-4 text-gray-700" />
                </button>

                <button
                    onClick={handleLikeToggle} // This will now use the internal session.user.id
                    className="absolute top-2 left-2 p-2 bg-white/80 hover:bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                >
                    <LikeButton isLiked={isLiked} />
                </button>
            </div>

            {/* Info Section */}
            <div className="p-4 flex flex-col flex-grow">
                <div className="flex flex-col justify-between" style={{ minHeight: '120px' }}>
                    <div className="">
                        <Link href={`/shop/product/${product.id}`}>
                            <h3 className="font-semibold text-base text-gray-800 hover:text-blue-600 transition-colors " style={{ minHeight: '2rem' }}>
                                {product.name}
                            </h3>
                        </Link>
                    </div>
                    <div className='flex flex-row justify-between items-center m-2 pb-2'>
                        <div>
                            <p className="text-sm text-gray-500">
                                {product.category?.name ?? 'Ангилалгүй'}
                            </p>
                            <div className="flex items-center gap-1">
                                <Package className="h-3 w-3 text-gray-400" />
                                <span
                                    className={`text-xs font-medium ${
                                        isOutOfStock
                                            ? 'text-red-600'
                                            : isLowStock
                                            ? 'text-orange-600'
                                            : 'text-green-600'
                                    }`}
                                >
                                    {isOutOfStock
                                        ? 'Бүтээгдэхүүн дууссан'
                                        : isLowStock
                                        ? `Үлдэгдэл: ${product.stock}`
                                        : `Үлдэгдэл: ${product.stock}`}
                                </span>
                            </div>
                        </div>
                        <div >
                            <span className="font-bold text-lg text-gray-900">
                                {product.price.toLocaleString()}₮
                            </span>
                        </div>
                    </div>
                </div>

                {/* Add to Cart button */}
                <button
                    onClick={handleAddToCart}
                    disabled={isOutOfStock}
                    className={`w-full mt-2 py-2 text-sm rounded-lg font-semibold transition-colors ${
                        isOutOfStock
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            : 'bg-rose-500 text-white hover:bg-rose-600'
                    } mt-auto`}
                >
                    {isOutOfStock ? 'Бүтээгдэхүүн дууссан' : 'Сагсанд нэмэх'}
                </button>

            </div>
        </div>
    );
};

export default ProductCard;