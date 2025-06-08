import Category from "@/components/Category";
import ProductCard from "@/components/ProductCard";
import Slider from "@/components/Slider";

const HomePage = () =>{
  const products = [...Array(8).keys()];
  
  return (
    <main className="mr-16 ml-16">      
      <div className="pr-4 pl-4">

        <Slider/>

        <h1 className="primary-header pt-8">Ангиллаар дэлгүүр хэсэх</h1>
        <div className=" touch-auto flex w-full overflow-x-scroll flex-nowrap -hide gap-4 py-4"> 
          <Category layout="row"/>
        </div>

        <h1 className="primary-header pt-8">Онцлох бүтээгдэхүүн</h1>
        <div className="product-list flex flex-wrap p-2 gap-2 rounded-lg justify-between mb-8"> 
          {products.map((item, index) => {
            return <ProductCard key={index} />;
          })} 
        </div>
      </div>
      
    </main>
  );
}

export default HomePage;


  