import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";

const ProductCard = () => {
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
    //       Сагсанд нэмэх
    //     </button>
    //   </a>
    // </Fragment>

    <div className="w-48 bg-white border border-gray-100 rounded-md">
      <Link href="#" className="w-full flex flex-col">
        <div className="relative w-full h-48 rounded-t-md overflow-hidden">
          <Image src="/product1.webp" alt="" fill sizes="25vw"/>
        </div>
        <div className="text-xs p-3">
          <div className="flex justify-between items-center ">
            <span className="font-medium text-sm">Бүтээгдэхүүн нэр</span>
            <span className="">50,000₮</span>
          </div>          
            <span className="font-thin block mt-1">Ангилал</span>
        </div>
        <button className="mb-4 h-6 w-36 text-xs text-white bg-gray-400 rounded-full hover:bg-gray-500 mx-auto">
           Сагсанд нэмэх
        </button>
      </Link>

    </div>
  );
};

export default ProductCard;
