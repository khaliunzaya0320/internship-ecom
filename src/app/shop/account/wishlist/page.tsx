import ProductCard from "@/components/ProductCard";

const wishlistPage = () => {

  const products = [...Array(4).keys()];

  return (
    <div className="m-4 space-y-2">
      <h3 className="primary-header">Хадгалсан бүтээгдэхүүн</h3>
      <span className="text-gray-500">(2 бараа)</span>
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {products.map((item, index) => {
          return <ProductCard key={index} />;
        })} 
      </div>
    </div>
  )
};

export default wishlistPage;
