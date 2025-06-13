'use client';

import { useState, useEffect } from 'react';
import { X, ShoppingCart, Heart, Package, Star } from 'lucide-react';
import Image from 'next/image';
import { Product } from '@/types';

interface QuickViewModalProps {
    productId: number | null;
    isOpen: boolean;
    onClose: () => void;
}

const QuickViewModal = ({
    productId,
    isOpen,
    onClose,
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
                const data = await response.json();
                setProduct(data);
                setSelectedImageIndex(0);
                setQuantity(1);
            }
        } catch (error) {
            console.error('Error fetching product:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setProduct(null);
        onClose();
    };

    if (!isOpen) return null;

    const isOutOfStock = product?.stock === 0;
    const isLowStock = product && product.stock > 0 && product.stock <= 5;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Quick View
                    </h2>
                    <button
                        onClick={handleClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="h-5 w-5" />
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
                                            product.images?.[selectedImageIndex]
                                                ?.imageUrl || product.imageUrl
                                        }
                                        alt={product.name}
                                        fill
                                        className="object-cover"
                                    />
                                    {isOutOfStock && (
                                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                            <span className="text-white text-lg font-medium">
                                                Out of Stock
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Thumbnail Images */}
                                {product.images &&
                                    product.images.length > 1 && (
                                        <div className="flex gap-2 overflow-x-auto">
                                            {product.images.map(
                                                (image, index) => (
                                                    <button
                                                        key={image.id}
                                                        onClick={() =>
                                                            setSelectedImageIndex(
                                                                index,
                                                            )
                                                        }
                                                        className={`relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 ${
                                                            selectedImageIndex ===
                                                            index
                                                                ? 'ring-2 ring-blue-500'
                                                                : ''
                                                        }`}
                                                    >
                                                        <Image
                                                            src={image.imageUrl}
                                                            alt={`${product.name} ${index + 1}`}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </button>
                                                ),
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
                                        {product.category?.name ||
                                            'Uncategorized'}
                                    </p>
                                </div>

                                <div className="text-3xl font-bold text-gray-900">
                                    {product.price.toLocaleString()}₮
                                </div>

                                {/* Stock Status */}
                                <div className="flex items-center gap-2">
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
                                            ? 'Out of Stock'
                                            : isLowStock
                                              ? `Only ${product.stock} left in stock`
                                              : `${product.stock} in stock`}
                                    </span>
                                </div>

                                {/* Description */}
                                <div>
                                    <h3 className="font-medium text-gray-900 mb-2">
                                        Description
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {product.description}
                                    </p>
                                </div>

                                {/* Quantity and Add to Cart */}
                                {!isOutOfStock && (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Quantity
                                            </label>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() =>
                                                        setQuantity(
                                                            Math.max(
                                                                1,
                                                                quantity - 1,
                                                            ),
                                                        )
                                                    }
                                                    className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
                                                >
                                                    -
                                                </button>
                                                <span className="px-4 py-2 border border-gray-300 rounded-md min-w-[60px] text-center">
                                                    {quantity}
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        setQuantity(
                                                            Math.min(
                                                                product.stock,
                                                                quantity + 1,
                                                            ),
                                                        )
                                                    }
                                                    className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex gap-3">
                                            <button className="flex-1 bg-rose-500 text-white py-3 px-6 rounded-lg hover:bg-rose-600 transition-colors flex items-center justify-center gap-2">
                                                <ShoppingCart className="h-5 w-5" />
                                                Add to Cart
                                            </button>
                                            <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                                <Heart className="h-5 w-5" />
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
                                        View Full Details →
                                    </a>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-600">Product not found</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuickViewModal;
