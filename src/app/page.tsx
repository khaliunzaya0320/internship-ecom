import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const products = [...Array(11).keys()];
  console.log(products);

  return (
    <main>
      <div className="text-3xl font-bold underline">Home page</div>

      <Link href={`/account`}>Account</Link>
      <Link href={`/account/order`}>Account order</Link>

      <Link href={`/auth/login`}>Login</Link>
      <Link href={`/auth/logout`}>Logout</Link>
      <Link href={`/auth/register`}>Register</Link>

      <div className="product-list">
        {products &&
          products.map((item, index) => {
            return <ProductCard key={index} />;
          })}
      </div>
    </main>
  );
}
