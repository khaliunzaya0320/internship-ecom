'use client';

import { useState, useEffect } from 'react';
import { X, ShoppingCart, Heart, Package, Star } from 'lucide-react'; 
import Image from 'next/image';
import { Product } from '@/types'; 
import Quantity from './Quantity'; 

interface QuickViewModalProps {
    productId: number | null;
    isOpen: boolean;
    onClose: () => void;
    onAddToCart?: (product: Product, quantity: number) => void;
}

const QuickViewModal = ({
    productId,
    isOpen,
    onClose,
    onAddToCart, 
}: QuickViewModalProps) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1); 

    useEffect(() => {
        if (isOpen && productId) {
            fetchProduct();
        }
    }, [isOpen, productId]);

    const fetchProduct = async () => {
        if (!productId) return;

        setLoading(true);
        try {
            const response = await fetch(`/api/product/${productId}`);
            if (response.ok) {
                const data: Product = await response.json();
                const formattedProduct = {
                    ...data,
                    createdAt: new Date(data.createdAt),
                    updatedAt: new Date(data.updatedAt),
                };
                setProduct(formattedProduct);
                setSelectedImageIndex(0);
                setQuantity(1); 
            } else {
                console.error('Бүтээгдэхүүн татахад алдаа гарлаа:', response.status, response.statusText);
                setProduct(null); 
            }
        } catch (error) {
            console.error('Бүтээгдэхүүн татахад сүлжээний алдаа гарлаа:', error);
            setProduct(null); 
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setProduct(null); 
        setQuantity(1); 
        onClose();
    };

    const handleAddToCartClick = () => {
        if (product && quantity > 0) {
            if (onAddToCart) {
                onAddToCart(product, quantity); 
            }
            console.log(`Сагсанд нэмлээ: ${quantity} x ${product.name}`);
        }
    };

    if (!isOpen) return null;

    const isOutOfStock = product?.stock === 0;
    const isLowStock = product && product.stock > 0 && product.stock <= 5;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Quick view
                    </h2>
                    <button
                        onClick={handleClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="h-5 w-5 text-gray-600" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {loading ? (
                        <div className="flex items-center justify-center h-64">
                            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
                        </div>
                    ) : product ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Images */}
                            <div className="space-y-4">
                                <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
                                    <Image
                                        src={
                                            product.images?.[selectedImageIndex]?.imageUrl || product.imageUrl
                                        }
                                        alt={product.name}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                                    />
                                    {isOutOfStock && (
                                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                            <span className="text-white text-lg font-medium">
                                                Бараа дууссан
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Thumbnail Images */}
                                {product.images && product.images.length > 0 && ( 
                                    <div className="flex gap-2 overflow-x-auto">
                                        {product.images.map(
                                            (image: { id: number; imageUrl: string }, index: number) => (
                                                <button
                                                    key={image.id || index} 
                                                    onClick={() => setSelectedImageIndex(index)}
                                                    className={`relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 border-2 ${
                                                        selectedImageIndex === index
                                                            ? 'border-blue-500'
                                                            : 'border-transparent hover:border-gray-300'
                                                    } transition-colors`}
                                                >
                                                    <Image
                                                        src={image.imageUrl}
                                                        alt={`${product.name} ${index + 1}`}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </button>
                                            )
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Product Info */}
                            <div className="space-y-6">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                        {product.name}
                                    </h1>
                                    <p className="text-lg text-gray-600">
                                        {product.category?.name || 'Ангилалгүй'}
                                    </p>
                                    {/* Stock Status */}
                                    <div className="flex items-center gap-2 mt-2">
                                        <Package className="h-5 w-5 text-gray-400" />
                                        <span
                                            className={`font-medium ${
                                                isOutOfStock
                                                    ? 'text-red-600'
                                                    : isLowStock
                                                    ? 'text-orange-600'
                                                    : 'text-green-600'
                                            }`}
                                        >
                                            {isOutOfStock
                                                ? 'Бараа дууссан'
                                                : isLowStock
                                                ? `Ердөө ${product.stock} ширхэг үлдсэн`
                                                : `${product.stock} ширхэг байгаа`}
                                        </span>
                                    </div>
                                </div>

                                <div className="text-3xl font-bold text-gray-900">
                                    {product.price.toLocaleString()}₮
                                </div>

                                {/* Description */}
                                <div>
                                    <h3 className="font-medium text-gray-900 mb-2">
                                        Тайлбар
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {product.description}
                                    </p>
                                </div>

                                {/* Quantity and Add to Cart */}
                                {!isOutOfStock && product && ( 
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Тоо ширхэг
                                            </label>
                                            <Quantity
                                                quantity={quantity}
                                                setQuantity={setQuantity}
                                                stock={product.stock} 
                                            />
                                        </div>

                                        <div className="flex gap-3">
                                            <button
                                                onClick={handleAddToCartClick} 
                                                className="flex-1 bg-rose-500 text-white py-3 px-6 rounded-lg hover:bg-rose-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                                disabled={quantity === 0 || isOutOfStock} 
                                            >
                                                <ShoppingCart className="h-5 w-5" />
                                                Сагсанд нэмэх
                                            </button>
                                            <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                                <Heart className="h-5 w-5 text-gray-600" />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* View Full Details */}
                                <div className="pt-4 border-t border-gray-200">
                                    <a
                                        href={`/shop/product/${product.id}`}
                                        onClick={handleClose}
                                        className="text-blue-600 hover:text-blue-800 font-medium"
                                    >
                                        Дэлгэрэнгүй харах →
                                    </a>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-600">Бүтээгдэхүүн олдсонгүй.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuickViewModal;