import { Metadata } from 'next';
import '../styles/globals.css';
import React from 'react';
import SessionProvider from '@/components/SessionProvider';
import { CartProvider } from '@/context/CartContext';
import { ToastProvider } from '@/components/ToastProvider';
import { NotificationProvider } from '@/context/NotificationContext';


export const metadata: Metadata = {
    title: 'E-Commerce app',
    description: 'E-Commerce app',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="bg-gray-100">
                <SessionProvider>
                    <ToastProvider>
                        <NotificationProvider>
                            <CartProvider>
                                {children}
                            </CartProvider>
                        </NotificationProvider>
                    </ToastProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
