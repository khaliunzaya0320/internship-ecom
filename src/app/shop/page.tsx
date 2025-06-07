import Category from "@/components/Category";
import ProductCard from "@/components/ProductCard";
import Slider from "@/components/Slider";

const HomePage = () =>{
  const products = [...Array(5).keys()];
  

  return (
    <main className="mt-2 mr-8 ml-8">      
      <div className="pr-4 pl-4">

        <Slider/>

        <h1 className="primary-header">Ангиллаар дэлгүүр хэсэх</h1>
        <div className="scrollbar-hide touch-auto flex w-full overflow-x-scroll flex-nowrap -hide gap-4 py-4"> 
          <Category />
        </div>

        <h1 className="primary-header">Онцлох</h1>
        <div className="product-list flex flex-wrap p-2 gap-2 bg-slate-200 rounded-lg justify-between"> 
          {products.map((item, index) => {
            return <ProductCard key={index} />;
          })} 
        </div>
      </div>
      
    </main>
  );
}

export default HomePage;


  