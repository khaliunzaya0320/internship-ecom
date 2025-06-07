"use client"
import { useParams } from "next/navigation";
import { useState } from "react";

const Quantity = () => {

  const params = useParams();
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
    <div className="flex justify-between items-center border border-gray-300 rounded-3xl px-3 py-2 w-28">
            <button className="cursor-pointer text-xl font-bold hover:text-rose-600" onClick={()=>handleQuantity("dec")}>-</button>
            {quantity}
            <button className="cursor-pointer text-xl font-bold hover:text-rose-600" onClick={()=>handleQuantity("inc")}>+</button>
    </div>
  )
}

export default Quantity;