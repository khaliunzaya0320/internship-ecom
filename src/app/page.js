import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import RootLayout from "./layout";
import Head from "next/head";


export default function Home() {
  const products = [...Array(11).keys()];
  console.log(products);

  return (
    <main>
      
      
      
      <div className="p-4">
        Бүтээгдэхүүн
        <div className="product-list flex flex-wrap gap-6 m-4"> 
          {products &&
            products.map((item, index) => {
              return <ProductCard key={index} />;
            })}
        </div>
      </div>
      
    </main>
  );
}
