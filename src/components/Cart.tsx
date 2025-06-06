import { Fragment } from "react";
import Image from "next/image";


const Cart = () => {

  return (
    // <Fragment>
    //   <a
    //     href="#"
    //     className="block w-48 mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    //   >
    //     <h5 className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">
    //       Барааны нэр
    //     </h5>
    //     <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">
    //       Here are the biggest enterprise technology acquisitions of 2021 so
    //       far, in reverse chronological order.
    //     </p>
    //     <button className="px-4 py-2 text-white bg-blue-400 rounded hover:bg-blue-500">
    //       Устгах
    //     </button>
    //   </a>
    // </Fragment>

    <div className="flex items-start justify-between gap-4 p-4 mt-2 border rounded bg-white">Cart
        
      <Image
        src="/product1.webp"
        alt=""
        width={80}
        height={80}
      />
          
      <div className="flex-1">
        <h3 className="font-semibold">Бүтээгдэхүүн нэр</h3>
          <div className="flex gap-2 mt-1 text-sm items-center"> 
            <span className="">Үлдэгдэл: 1</span>
          </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="text-right mr-4">
          <div className="text-sm font-semibold">1000 ₮</div>
        </div>

        <div className="flex items-center border rounded gap-4 p-1">
          <button>-</button>
          <div>1</div>
          <button>+</button>
        </div>

        <div>1000 ₮</div>
      </div>

         

    </div>
  )
}

export default Cart;
