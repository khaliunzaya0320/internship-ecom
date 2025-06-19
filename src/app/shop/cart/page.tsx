'use client'; 

import CartItem from '@/components/CartItem'; 
import { useCart } from '@/context/CartContext'; 
import { Trash2 } from 'lucide-react'; 
import { useSession } from 'next-auth/react'; 
import { toast } from 'react-toastify'; 

const CartPage = () => {
    const { cartProducts, clearCart } = useCart();
    const { data: session } = useSession();
    
    const totalAmount = cartProducts.reduce((sum, p) => sum + p.product.price * p.quantity, 0);

    const handlePlaceOrder = async () => {
        
        if (!session || !session.user || !session.user.id) {
            toast.error('Захиалга хийхийн тулд эхлээд нэвтэрнэ үү!');
            return;
        }

        if (cartProducts.length === 0) {
            toast.error('Таны сагс хоосон байна. Бараа нэмнэ үү.');
            return;
        }

        const isConfirmed = window.confirm('Та захиалгаа баталгаажуулахдаа итгэлтэй байна уу?');
        if (!isConfirmed) {
            return; 
        }

        try {
            const res = await fetch('/api/order', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({
                    userId: session.user.id,
                    cartProducts: cartProducts.map(item => ({
                        productId: item.product.id,
                        quantity: item.quantity,
                    })),
                }),
            });

            if (res.ok) {
                toast.success('Таны захиалга амжилттай үүслээ!'); 
                clearCart(); 
            } else {
                const errorData = await res.json(); 
                console.error('Захиалга хийхэд алдаа гарлаа:', res.status, errorData);
                toast.error(`Захиалга хийхэд алдаа гарлаа: ${errorData.message || 'Үл мэдэгдэх алдаа'}`);
            }
        } catch (error) {
            console.error('Захиалга хийх үйл явцад алдаа гарлаа:', error);
            toast.error('Захиалга хийхэд алдаа гарлаа. Дахин оролдоно уу.');
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-16 m-4 pl-8 pr-8">
            {/* Сагсны үндсэн хэсэг */}
            <div className="lg:w-3/5 w-full">
                <div className="flex justify-between items-center">
                    <h2 className="primary-header">Таны сагс</h2>
                    <button
                        className="bg-white p-2 rounded-md flex items-center gap-2 text-sm hover:bg-gray-50 border text-gray-700"
                        onClick={clearCart}
                    >
                        <Trash2 className="w-4 h-4" />
                        <span>Сагс хоослох</span>
                    </button>
                </div>

                <div className="space-y-4">
                    {cartProducts.length === 0 ? (
                        <p className="text-gray-500 mt-4">Таны сагс хоосон байна.</p>
                    ) : (
                        cartProducts.map((product) => (
                            <CartItem key={product.id} product={product} />
                        ))
                    )}
                </div>
            </div>

            {/* Төлбөрийн мэдээллийн хэсэг */}
            <div className="lg:w-2/5 w-full h-96">
                <h2 className="primary-header mb-6">Төлбөрийн мэдээлэл</h2>
                <div className="flex flex-col bg-white rounded-md p-8 shadow-sm mt-2">
                    <p className="text-lg font-medium mb-4">
                        Нийт төлөх дүн:{' '}
                        <span className="font-bold text-rose-600">
                            {totalAmount.toLocaleString()}₮ 
                        </span>
                    </p>
                    <button
                        className="form-button w-full"
                        onClick={handlePlaceOrder}
                    >
                        Захиалах
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;