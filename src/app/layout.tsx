import { Metadata } from "next";
import "../styles/globals.css";
import React from "react";
import '../styles/globals.css'


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
        
        {children}
        
      </body>
    </html>
  );
  
}
