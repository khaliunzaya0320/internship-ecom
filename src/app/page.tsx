import Category from "@/components/Category";
import ProductCard from "@/components/ProductCard";
import Slider from "@/components/Slider";

const Home = () =>{
  const products = [...Array(5).keys()];
  const categories = [...Array(7).keys()];

  return (
    <main className="mt-2 mr-8 ml-8">      
      <div className="pr-4 pl-4">

        <Slider/>

        <h1 className="text-xl font-bold m-4">Ангиллаар дэлгүүр хэсэх</h1>
        <div className="category-list flex flex-wrap mt-4 gap-4 justify-between"> 
          {products &&
            categories.map((item, index) => {
              return <Category key={index} />;
            })}
            
        </div>

        <h1 className="text-xl font-bold m-4 mt-10">Онцлох</h1>
        <div className="product-list flex flex-wrap p-2 gap-2 bg-slate-200 rounded-lg justify-between"> 
          {products &&
            products.map((item, index) => {
              return <ProductCard key={index} />;
            })}
            
        </div>
      </div>
      
    </main>
  );
}

export default Home;


  