import Cart from "@/components/Cart"
import {Trash} from "lucide-react"

const CartPage = () => {
  const carts = [...Array(2).keys()];
  return (

    <div className="flex flex-row gap-8 m-4 max-h-screen">

      <div className="flex w-3/5">
        <h2 className="primary-header">Таны сагс</h2>
        <div className="">
          <button className="bg-white p-2 rounded-md flex flex-row items-center gap-2">
            <Trash className="menu-icon"/>
            <span>Сагс хоослох</span>
          </button>

          {carts &&
          carts.map((item, index) => {
            return <Cart key={index} />;
          })}

        </div>
      </div>

      <div className="w-2/5">
        <h2 className="primary-header">Төлбөрийн мэдээлэл</h2>
        <div className="flex flex-col bg-white rounded-md m-2 p-8">
          <p>Нийт төлөх дүн</p>
          <button className="form-button">Захиалах</button>
        </div>
      </div>

    </div>
  )
};

export default CartPage;
