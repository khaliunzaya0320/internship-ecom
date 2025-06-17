'use client';

import { useEffect, useState } from 'react';
import Category from '@/components/Category';
import ProductCard from '@/components/ProductCard';
import Slider from '@/components/Slider';


type Product = {
    id: number;
    name: string;
    category: {
        id: number;
        name: string;
    };
    description: string;
    price: number;
    stock: number;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
};

type CartProduct = Product & { quantity: number };

const HomePage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [cart, setCart] = useState<CartProduct[]>([]);

    const handleAddToCart = (product: Product) => {
        setCart((prevCart) => {
            const existing = prevCart.find((item) => item.id === product.id);
            if (existing) {
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const fetchFeaturedProducts = async () => {
        const res = await fetch('/api/product');
        if (res.ok) {
            const data = await res.json();
            setProducts(data);
        } else {
            console.error('Product fetch error');
        }
    };

    useEffect(() => {
        fetchFeaturedProducts();
    }, []);

    return (
        <main className="mr-16 ml-16">
            <div className="pr-4 pl-4">
                <Slider />

                <h1 className="primary-header pt-8">Ангиллаар дэлгүүр хэсэх</h1>
                <div className="touch-auto flex w-full overflow-x-scroll flex-nowrap -hide gap-4 py-4">
                    <Category layout="row" />
                </div>

                <h1 className="primary-header pt-8">Онцлох бүтээгдэхүүн</h1>
                <div className="flex flex-row flex-wrap p-2 gap-4 rounded-lg mb-8">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart}/>
                    ))}
                </div>

                <h1 className="primary-header">Бүх бүтээгдэхүүн</h1>
                <div className="product-list flex flex-wrap p-2 gap-4 rounded-lg mb-8">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </main>
    );
};

export default HomePage;
