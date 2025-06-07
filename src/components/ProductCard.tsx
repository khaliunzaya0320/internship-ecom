import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { ImageIcon } from "lucide-react";

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

    <div className="w-64 bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden mb-4">
      <Link href={"/shop/product/{id}"} className="h-full flex flex-col">

        {/* Image */}
        <div className="relative flex w-full h-48 bg-gray-200 items-center justify-center">
          {/* <ImageIcon/> */}
          <Image
            src="/product1.webp"
            alt=""
            fill
            className="object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-between flex-grow p-4">
          <div className="mb-2">
            <h3 className="font-medium text-base text-gray-800">Бүтээгдэхүүн нэр</h3>
            <p className="text-sm text-gray-500 mt-1">Ангилал</p>
          </div>          
          <div className="flex justify-between items-center mt-auto">
            <span className="font-bold  text-cyan-800-">50,000₮</span>
          </div>
        </div>

        <div className="p-4 pt-0">
          <button className="w-full py-2 text-sm rounded-full text-white bg-rose-500 hover:bg-rose-600">
            Сагсанд нэмэх
          </button>
        </div>

      </Link>
    </div>
  );
};

export default ProductCard;
