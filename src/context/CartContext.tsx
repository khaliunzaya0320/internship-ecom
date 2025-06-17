'use client';
import { createContext, useContext, useState } from 'react';
import { useEffect } from 'react';

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
  quantity: number;
};

type CartContextType = {
  cartProducts: Product[];
  addToCart: (product: Product) => void;
  clearCart: () => void;
  updateQuantity: (productId: number, newQuantity: number) => void;
  removeFromCart: (productId: number) => void;
};


const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartProducts, setCart] = useState<Product[]>([]);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) {
      setCart(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartProducts));
  }, [cartProducts]);


  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        return prev.map(p =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };


  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(p => p.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    setCart(prev =>
      prev.map(p =>
        p.id === productId ? { ...p, quantity: newQuantity } : p
      )
    );
  };

  return (
    <CartContext.Provider value={{ cartProducts, addToCart, clearCart, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};