import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
  
  return (
    <div>
      <div className="bg-gray-100">
        <Header/>
        {children}
        <Footer/>
      </div>
      
    </div>
    );
  }