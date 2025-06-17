'use client';

import Image from 'next/image';
import Quantity from './Quantity';
import { Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { toast } from 'react-toastify';
import { CartItem as CartItemType } from '@/types'; 

export type CartItemProps = {
    product: CartItemType; 
};

const CartItem = ({ product }: CartItemProps) => {

    const { removeFromCart, updateQuantity } = useCart();

    const handleQuantityChange = (newQuantity: number) => {
        updateQuantity(product.productId, newQuantity); 
    };

    const handleRemoveFromCart = () => {
        removeFromCart(product.productId); 
        toast.error(`${product.product.name} сагснаас хасагдлаа.`); 
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 mt-2 border rounded-lg bg-white shadow-sm">
            {/* Image */}
            <div className="w-20 h-20 relative">
                <Image
                    src={product.product.imageUrl} 
                    alt={product.product.name}    
                    fill
                    className="object-cover rounded"
                />
            </div>

            {/* Info */}
            <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{product.product.name}</h3> 
                <p className="text-sm text-gray-500 mt-1">
                    Үлдэгдэл: <span className="text-rose-600">{product.product.stock}</span> 
                </p>
            </div>

            {/* Quantity & Price */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="text-right">
                    <div className="text-sm font-semibold text-gray-700">
                        {product.product.price.toLocaleString()}₮ 
                    </div>
                </div>
                <Quantity
                    quantity={product.quantity}
                    setQuantity={handleQuantityChange}
                    stock={product.product.stock} 
                />
                <div className="text-sm font-bold text-rose-600">
                    {(product.product.price * product.quantity).toLocaleString()} ₮ 
                </div>
                <button
                    onClick={handleRemoveFromCart}
                    className="p-2 text-gray-400 hover:text-rose-600">
                    <Trash2 size={20} />
                </button>
            </div>
        </div>
    );
};

export default CartItem;