import Link from "next/link";

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
  
  return (

    <div className="flex min-h-screen">
      <aside className="w-64 bg-white p-6 border-r border-gray-200">
        <nav className="flex flex-col space-y-2">
          <Link href="/account/profile" className="hover:bg-gray-100 px-4 py-2 rounded">
            Хувийн мэдээлэл
          </Link>
          <Link href="/account/order" className="hover:bg-gray-100 px-4 py-2 rounded">
            Захиалга
          </Link>
          <Link href="/auth/logout" className="hover:bg-gray-100 px-4 py-2 rounded">
            Системээс гарах
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-8 bg-gray-50">
        {children}
      </main>

    </div>
  );
}

