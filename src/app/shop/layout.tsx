import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
  
  return (
    <div>
      <div className="bg-gray-100">
        <NavBar/>
        {children}
        <Footer/>
      </div>
      
    </div>
    );
  }