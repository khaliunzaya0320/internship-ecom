"use client"
import ProductImages from "@/components/ProductImages";
import Quantity from "@/components/Quantity";
import { useParams } from "next/navigation";
import { useState } from "react";

const ProductDetail = () => {

  const params = useParams();
  const {id} = params;
  const [quantity, setQuantity] = useState(1);
  const stock = 5

  return(
    <div className="p-2 m-4 relative flex flex-col lg:flex-row gap-16">

      {/* Images */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max ">
        <ProductImages/>
      </div>

      {/* Info */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        <h2 className="secondary-header">Бүтээгдэхүүний нэр</h2>
        <p className="secondary-text">Ангилал</p>
        <p className="secondary-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque ex dolorem cupiditate eligendi placeat, qui porro? Quod, officia consequatur provident quam nam, mollitia recusandae nesciunt, dignissimos cumque quisquam aliquid earum.</p>
        <div className="h-[2px] bg-gray-200"/>
          <h3 className="text-xl font-bold text-rose-600">1,000₮</h3>
        <div className="secondary-text">
          Үлдэгдэл:<span className="font-semibold text-rose-600 pl-1">{stock}</span>
        </div>
        <div className="h-[2px] bg-gray-200"/>

        <div className="flex flex-col gap-4">
          <span className="secondary-text">Тоо ширхэг</span>
          <Quantity/>
          <button className="default-button">Сагсанд нэмэх</button>
        </div>

      </div>

    </div>
  )
}

export default ProductDetail;