"use client"
import ProductImages from "@/components/ProductImages";
import Quantity from "@/components/Quantity";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Product } from "@/types";

const ProductDetail = () => {
  const params = useParams();
  const { id } = params;
  const { data: session } = useSession();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  useEffect(() => {
    // Track viewed product when component mounts and user is logged in
    if (product && session?.user?.id) {
      trackViewedProduct();
    }
  }, [product, session]);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/product/${id}`);
      if (res.ok) {
        const data = await res.json();
        setProduct(data);
      } else {
        setError("Бүтээгдэхүүн олдсонгүй");
      }
    } catch (error) {
      setError("Серверийн алдаа");
    } finally {
      setLoading(false);
    }
  };

  const trackViewedProduct = async () => {
    try {
      await fetch('/api/viewed-products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: parseInt(id as string) }),
      });
    } catch (error) {
      console.error("Failed to track viewed product:", error);
    }
  };

  if (loading) {
    return (
      <div className="p-2 m-4 text-center">
        <div className="text-gray-500">Ачааллаж байна...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="p-2 m-4 text-center">
        <div className="text-red-500">{error || "Бүтээгдэхүүн олдсонгүй"}</div>
      </div>
    );
  }

  return(
    <div className="p-2 m-4 relative flex flex-col lg:flex-row gap-16">

      {/* Images */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max ">
        <ProductImages imageUrl={product.imageUrl} />
      </div>

      {/* Info */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        <h2 className="secondary-header">{product.name}</h2>
        <p className="secondary-text">{product.category.name}</p>
        <p className="secondary-text">{product.description}</p>
        <div className="h-[2px] bg-gray-200"/>
        <h3 className="text-xl font-bold text-rose-600">{product.price.toLocaleString()}₮</h3>
        <div className="secondary-text">
          Үлдэгдэл:<span className="font-semibold text-rose-600 pl-1">{product.stock}</span>
        </div>
        <div className="h-[2px] bg-gray-200"/>

        <div className="flex flex-col gap-4">
          <span className="secondary-text">Тоо ширхэг</span>
          <Quantity quantity={quantity} setQuantity={setQuantity} stock={product.stock} />
          <button 
            className="default-button"
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? "Дууссан" : "Сагсанд нэмэх"}
          </button>
        </div>

      </div>

    </div>
  )
}

export default ProductDetail;