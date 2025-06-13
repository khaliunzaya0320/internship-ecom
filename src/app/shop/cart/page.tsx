import CartItem from "@/components/CartItem"
import {Trash2} from "lucide-react"

const CartPage = () => {

  const carts = [...Array(4).keys()];

  return (
    <div className="flex flex-col lg:flex-row gap-8 m-4">

      {/* Cart */}
      <div className="lg:w-3/5 w-full">

        <div className="flex justify-between items-center mb-4">
          <h2 className="primary-header">Таны сагс</h2>
          <button className="bg-white p-2 rounded-md flex items-center gap-2 text-sm hover:bg-gray-50 border text-gray-700">
            <Trash2 className="w-4 h-4" />
            <span>Сагс хоослох</span>
          </button>
        </div>

        {/* Cart Items */}
        <div className="space-y-4">
          {carts && carts.map((item, index) => (
            <CartItem key={index} />
          ))}
        </div>
      </div>

      {/* Payment */}
      <div className="lg:w-2/5 w-full">
        <h2 className="primary-header">Төлбөрийн мэдээлэл</h2>
        <div className="flex flex-col bg-white rounded-md p-8 shadow-sm mt-2">
          <p className="text-lg font-medium mb-4">Нийт төлөх дүн: <span className="font-bold text-rose-600">2,000₮</span></p>
          <button className="form-button w-full">Захиалах</button>
        </div>
      </div>

    </div>
  );
};

export default CartPage;
