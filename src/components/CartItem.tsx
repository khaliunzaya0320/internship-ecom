import Image from "next/image";
import Quantity from "./Quantity";
import { Trash2 } from "lucide-react";

const Cart = () => {
  const name = "Бүтээгдэхүүн нэр";
  const price = 1000;
  const stock = 5;
  const quantity = 1;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 mt-2 border rounded-lg bg-white shadow-sm">
      
      {/* Image */}
      <div className="w-20 h-20 relative">
        <Image
          src="/product1.webp"
          alt={name}
          fill
          className="object-cover rounded"
        />
      </div>

      {/* Info */}
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-500 mt-1">
          Үлдэгдэл: <span className="text-rose-600">{stock}</span>
        </p>
      </div>

      {/* Quantity  Price */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="text-right">
          <div className="text-sm font-semibold text-gray-700">
            {price} ₮
          </div>
        </div>
        <Quantity/>
        <div className="text-sm font-bold text-rose-600">
          {price * quantity} ₮
        </div>
        <button className="p-2 text-gray-400 hover:text-rose-600">
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default Cart;
