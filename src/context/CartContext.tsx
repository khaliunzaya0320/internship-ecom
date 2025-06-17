'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { Product, CartItem } from '@/types'; 
import { useNotification } from './NotificationContext';

type CartContextType = {
    cartProducts: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    increaseQuantity: (productId: number) => void;
    decreaseQuantity: (productId: number) => void;
    updateQuantity: (productId: number, newQuantity: number) => void;
    clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartProducts, setCart] = useState<CartItem[]>([]);
    const { addNotification } = useNotification();

    const notificationQueue = useRef<{ message: string; type: any }[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem('cart');
        if (stored) {
            setCart(JSON.parse(stored));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartProducts));
    }, [cartProducts]);

    useEffect(() => {
        if (notificationQueue.current.length > 0) {
            const { message, type } = notificationQueue.current.shift()!;
            addNotification(message, type);
        }
    }, [cartProducts, addNotification]); 

    const addToCart = (product: Product) => {
        setCart((prev) => {
            const existingItem = prev.find((item) => item.productId === product.id);
            if (existingItem) {
                const updatedCart = prev.map((item) =>
                    item.productId === product.id 
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
                notificationQueue.current.push({ message: `${product.name} сагсанд тоо нэмэгдлээ.`, type: 'info' });
                return updatedCart;
            } else {
                const newItem: CartItem = {
                    id: Date.now() + Math.random(), 
                    userId: 0, 
                    productId: product.id,
                    product: product, 
                    quantity: 1,
                };
                notificationQueue.current.push({ message: `${product.name} сагсанд нэмэгдлээ.`, type: 'success' });
                return [...prev, newItem]; 
            }
        });
    };

    const removeFromCart = (productId: number) => {
        setCart((prev) => {
            const removedProduct = prev.find((p) => p.productId === productId); 
            const newCart = prev.filter((p) => p.productId !== productId); 
            if (removedProduct) {
                notificationQueue.current.push({ message: `${removedProduct.product.name} сагснаас хасагдлаа.`, type: 'error' });
            }
            return newCart;
        });
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('cart');
        notificationQueue.current.push({ message: 'Сагсыг хоослолоо.', type: 'info' });
    };

    const increaseQuantity = (productId: number) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.map((item) =>
                item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item 
            ).filter(item => item.quantity > 0);
            const productInCart = prevCart.find(item => item.productId === productId); 
            if(productInCart) {
                notificationQueue.current.push({ message: `${productInCart.product.name} тоо нэмэгдлээ.`, type: 'info' });
            }
            return updatedCart;
        });
    };

    const decreaseQuantity = (productId: number) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.map((item) =>
                item.productId === productId
                    ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
                    : item
            ).filter(item => item.quantity > 0);
            const productInCart = prevCart.find(item => item.productId === productId);
            if(productInCart && productInCart.quantity > 1) { 
                notificationQueue.current.push({ message: `${productInCart.product.name} тоо хасагдлаа.`, type: 'info'})
            }
            return updatedCart;
        });
    };

    const updateQuantity = (productId: number, newQuantity: number) => {
      setCart((prevCart) => {
          const productInCart = prevCart.find((item) => item.productId === productId);

          if (!productInCart) {
              notificationQueue.current.push({ message: `Бараа олдсонгүй: ${productId}`, type: 'error' });
              return prevCart;
          }

          if (newQuantity <= 0) {
              notificationQueue.current.push({ message: `${productInCart.product.name} сагснаас хасагдлаа.`, type: 'error' });
              return prevCart.filter((item) => item.productId !== productId);
          }

          if (newQuantity > productInCart.product.stock) {
              notificationQueue.current.push({ message: `${productInCart.product.name}-ийн үлдэгдэл хүрэлцэхгүй байна.`, type: 'warning' });
              return prevCart.map((item) =>
                  item.productId === productId ? { ...item, quantity: productInCart.product.stock } : item
              );
          }

          notificationQueue.current.push({ message: `${productInCart.product.name} тоо ${newQuantity} болж өөрчлөгдлөө.`, type: 'info' });
          return prevCart.map((item) =>
              item.productId === productId ? { ...item, quantity: newQuantity } : item
          );
      });
  };

    return (
        <CartContext.Provider
            value={{
                cartProducts,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
                updateQuantity,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};