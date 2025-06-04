import { Metadata } from "next";
import "../styles/globals.css";
import Link from "next/link";
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";


export const metadata: Metadata = {
  title: "E-Commerce app",
  description: "E-Commerce app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <NavBar/>
        {children}
        <Footer/>
      </body>
      
    </html>
  );
}
