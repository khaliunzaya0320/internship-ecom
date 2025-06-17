'use client';

import Image from 'next/image';
import Quantity from './Quantity';
import { Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';


export type CartItemProps = {
    product: {
        id: number;
        name: string;
        price: number;
        stock: number;
        imageUrl: string;
        quantity: number;
    };
};

const CartItem = ({ product }: CartItemProps) => {

    const { removeFromCart, updateQuantity } = useCart(); 

    const handleQuantityChange = (newQuantity: number) => {
        updateQuantity(product.id, newQuantity);
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 mt-2 border rounded-lg bg-white shadow-sm">
            {/* Image */}
            <div className="w-20 h-20 relative">
                <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover rounded"
                />
            </div>

            {/* Info */}
            <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-500 mt-1">
                    Үлдэгдэл: <span className="text-rose-600">{product.stock}</span>
                </p>
            </div>

            {/* Quantity & Price */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="text-right">
                    <div className="text-sm font-semibold text-gray-700">
                        {product.price.toLocaleString()} ₮
                    </div>
                </div>
                <Quantity
                    quantity={product.quantity} 
                    setQuantity={handleQuantityChange} 
                    stock={product.stock}
                />
                <div className="text-sm font-bold text-rose-600">
                    {(product.price * product.quantity).toLocaleString()} ₮ 
                </div>
                <button
                    onClick={() => void removeFromCart(product.id)}
                    className="p-2 text-gray-400 hover:text-rose-600">
                    <Trash2 size={20} />
                </button>
            </div>
        </div>
    );
};

export default CartItem;