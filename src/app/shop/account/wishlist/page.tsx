"use client"
import ProductCard from "@/components/ProductCard";
import { useState, useEffect } from "react";

const wishlistPage = () => {

  const [wishlist, setWishlist] = useState<any[]>([])

  useEffect(()=>{
    const fetchWishlist = async () =>{
      const res = await fetch("/api/wishlist")
      const data = await res.json();
      setWishlist(data);
    }
    fetchWishlist()
  }, [])

  return (
    <div className="m-4 space-y-2">
      <h3 className="primary-header">Хадгалсан бүтээгдэхүүн</h3>

      <span className="text-gray-500">({wishlist.length} бараа)</span>
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {wishlist.map((product, index) => (
          <ProductCard key={product.id} product={product} isLiked/>
        ))}
      </div>

    </div>
  )
};

export default wishlistPage;
