import Link from "next/link";
import Image from "next/image";
import LikeButton from "./LikeButton";

export type ProductCardProps = {
  product: {
    id: number;
    name: string;
    category: {
      id: number;
      name: string;
    } | null; 
    description: string;
    price: number;
    stock: number;
    imageUrl: string;
    createdAt: string | Date;
    updatedAt: string | Date;
  };
  isLiked?: boolean;
  onLikeToggle?: () => void;
};

const ProductCard = ({ product, isLiked = false, onLikeToggle }: ProductCardProps) => {
  if (!product) return null;

  return (
    <div className="w-64 h-96 bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden p-4">
      <div className="h-full flex flex-col">

        {/* Image */}
        <Link
          href={`/shop/product/${product.id}`}
          className="relative flex w-auto h-48 bg-gray-200 items-center justify-center"
        >
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
          />
        </Link>

        {/* Info */}
        <div className="flex-grow pt-2">
          <h3 className="mb-2 font-medium text-base text-gray-800">
            {product.name}
          </h3>
        </div>

        <div className="">
            <div className="flex flex-row items-center justify-between pb-4">
              <div>
                <p className="text-sm text-gray-500">
                  {product.category?.name ?? "Ангилалгүй"}
                </p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="font-bold">{product.price.toLocaleString()}₮</span>
                </div>
              </div>

              <div>
                <button onClick={onLikeToggle}>
                  <LikeButton isLiked={isLiked} />
                </button>
              </div>
            </div>
            <button className="w-full py-2 text-sm rounded-full text-white bg-rose-500 hover:bg-rose-600">
              Сагсанд нэмэх
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
