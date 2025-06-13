'use client';

interface QuantityProps {
    quantity: number;
    setQuantity: (quantity: number) => void;
    stock: number;
}

const Quantity = ({ quantity, setQuantity, stock }: QuantityProps) => {
    const handleQuantity = (type: 'dec' | 'inc') => {
        if (type === 'dec' && quantity > 1) {
            setQuantity(quantity - 1);
        }
        if (type === 'inc' && quantity < stock) {
            setQuantity(quantity + 1);
        }
    };

    return (
        <div className="flex justify-between items-center border border-gray-300 rounded-3xl px-3 py-2 w-28">
            <button
                className="cursor-pointer text-xl font-bold hover:text-rose-600 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => handleQuantity('dec')}
                disabled={quantity <= 1}
            >
                -
            </button>
            {quantity}
            <button
                className="cursor-pointer text-xl font-bold hover:text-rose-600 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => handleQuantity('inc')}
                disabled={quantity >= stock}
            >
                +
            </button>{' '}
        </div>
    );
};

export default Quantity;
