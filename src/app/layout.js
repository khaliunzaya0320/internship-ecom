import { Metadata } from "next";
import "../styles/globals.css";
import Link from "next/link";


// export const metadata: Metadata = {
//   title: "E-Commerce app",
//   description: "E-Commerce app",
// };

export default function RootLayout({children}){
  return (
  
    <html lang="en">
      <ul className="flex flex-wrap justify-end gap-10 mb-2 px-4 py-2">
        <li className="mr-auto">
          <Link href="/">E-com</Link>
        </li>
        <li>
          <Link href="/cartitem" className="inline hover:bg-blue-200">Сагс</Link>
        </li>
        {/* <li>
          <Link href="/account/order" className="inline hover:bg-blue-200">Захиалга</Link>
        </li> */}
        <li>
          <Link href="/account" className="inline hover:bg-blue-200">Account</Link>
        </li>
      </ul>

      <body className="bg-gray-100">{children}</body>
    </html>
    
    
  );
}
