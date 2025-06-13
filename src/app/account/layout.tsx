import SideMenu from "@/components/SideMenu";
import Header from "@/components/Header";

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
  
  return (
    <div className="">
      <Header />
      <main className="flex">
        <SideMenu/>
        {children}
      </main>
    </div>
  );
}

