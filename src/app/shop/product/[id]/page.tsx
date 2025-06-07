"use client"
import ProductImages from "@/components/ProductImages";
import { useParams } from "next/navigation";
import { useState } from "react";

const ProductDetail = () => {
  const params = useParams();
  const {id} = params;
  const [quantity, setQuantity] = useState(1);
  const stock = 5

  const handleQuantity = (type: "dec" | "inc") =>{
    if(type==="dec" && quantity>1){
      setQuantity((prev)=>prev-1);
    }
    if(type==="inc" && quantity<stock){
      setQuantity((prev)=>prev+1);
    }
  }

  return(
    <div className="p-2 m-4 relative flex flex-col lg:flex-row gap-16">

      {/* Images */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max ">
        <ProductImages/>
      </div>

      {/* Info */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        <h2 className="secondary-header">Бүтээгдэхүүний нэр</h2>
        <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque ex dolorem cupiditate eligendi placeat, qui porro? Quod, officia consequatur provident quam nam, mollitia recusandae nesciunt, dignissimos cumque quisquam aliquid earum.</p>
        <div className="h-[2px] bg-gray-200"/>
        <h3 className="">1,000₮</h3>
        <div className="h-[2px] bg-gray-200"/>
        <div className="flex flex-col gap-4">
          <h3>Тоо ширхэг</h3>
          <div className="flex justify-between items-center border rounded-3xl p-2 w-28 bg-white">
            <button className="cursor-pointer text-xl" onClick={()=>handleQuantity("dec")}>-</button>
            {quantity}
            <button className="cursor-pointer text-xl" onClick={()=>handleQuantity("inc")}>+</button>
          </div>
          <button className="default-button">Сагсанд нэмэх</button>
        </div>
      </div>

    </div>
  )
}

export default ProductDetail;