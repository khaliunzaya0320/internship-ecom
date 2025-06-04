import { Fragment } from "react";
import Image from "next/image";


const Cart = () => {

  const cartItems = true

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

    <div className="absolute p-4 rounded bg-slate-200 flex flex-col gap-4">Cart
      {!cartItems ? (
        <div className="">Сагс хоосон байна</div>
      ) : (    
        <div className="">
          <Image 
            className="rounded"
            src="/product1.webp"
            alt=""
            width={96}
            height={112}
          />
          
          <div className="justify-between w-full">
            <h3 className="font-semibold">Бүтээгдэхүүн нэр</h3>
            <div>Үнэ</div>
            
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart;
