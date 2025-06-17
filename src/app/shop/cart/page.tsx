'use client';

import CartItem from '@/components/CartItem';
import { useCart } from '@/context/CartContext';
import { Trash2 } from 'lucide-react';

const CartPage = () => {
    const { cartProducts, clearCart } = useCart();
    const totalAmount = cartProducts.reduce((sum, p) => sum + p.price * p.quantity, 0);

    return (
        <div className="flex flex-col lg:flex-row gap-16 m-4 pl-8 pr-8">
            {/* Cart */}
            <div className="lg:w-3/5 w-full">
                <div className="flex justify-between items-center">
                    <h2 className="primary-header">Таны сагс</h2>
                    <button
                        className="bg-white p-2 rounded-md flex items-center gap-2 text-sm hover:bg-gray-50 border text-gray-700"
                        onClick={clearCart}  >
                        <Trash2 className="w-4 h-4" />
                        <span>Сагс хоослох</span>
                    </button>
                </div>

                <div className="space-y-4">
                    {cartProducts.map((product) => (
                        <CartItem key={product.id} product={product} />
                    ))}
                </div>
            </div>

            {/* Payment */}
            <div className="lg:w-2/5 w-full h-96">
                <h2 className="primary-header mb-6">Төлбөрийн мэдээлэл</h2>
                <div className="flex flex-col bg-white rounded-md p-8 shadow-sm mt-2">
                    <p className="text-lg font-medium mb-4">
                        Нийт төлөх дүн:{' '}
                        <span className="font-bold text-rose-600">
                        {totalAmount.toLocaleString()}₮
                        </span>
                    </p>
                    <button className="form-button w-full">Захиалах</button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
