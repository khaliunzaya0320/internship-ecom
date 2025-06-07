import SideMenu from "@/components/SideMenu";
import Link from "next/link";

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
  
  return (
    <div className="">
      
      <main className="flex">

        <SideMenu/>
        {children}

      </main>

    </div>
  );
}

