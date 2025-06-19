'use client';

import { useEffect, useState } from 'react';
import Category from '@/components/Category';
import ProductCard from '@/components/ProductCard';
import Slider from '@/components/Slider';
import QuickViewModal from '@/components/QuickViewModal'; 

type Product = {
    id: number;
    name: string;
    category: {
        id: number;
        name: string;
    };
    categoryId: number;
    description: string;
    price: number;
    stock: number;
    quantity: number;
    imageUrl: string;
    createdAt: Date; 
    updatedAt: Date; 
};

type CartProduct = Product & { quantity: number };

const HomePage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [cart, setCart] = useState<CartProduct[]>([]); 
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false); 
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null); 

    const handleQuickViewOpen = (productId: number) => {
        setSelectedProductId(productId);
        setIsQuickViewOpen(true);
        console.log(`Quick View-г нээж байна: Product ID = ${productId}`);
    };

    const handleQuickViewClose = () => {
        setIsQuickViewOpen(false);
        setSelectedProductId(null);
        console.log('Quick View-г хааж байна.');
    };

    const fetchFeaturedProducts = async () => {
        try {
            const res = await fetch('/api/product'); 
            if (res.ok) {
                const data: Product[] = await res.json();
                const formattedData = data.map(product => ({
                    ...product,
                    createdAt: new Date(product.createdAt),
                    updatedAt: new Date(product.updatedAt),
                }));
                setProducts(formattedData);
            } else {
                console.error('Бүтээгдэхүүн татахад алдаа гарлаа:', res.status, res.statusText);
            }
        } catch (error) {
            console.error('Бүтээгдэхүүн татахад сүлжээний алдаа гарлаа:', error);
        }
    };

    useEffect(() => {
        fetchFeaturedProducts();
    }, []);

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
        console.log(`Product ${product.name} added to cart.`);
    };

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
                        <ProductCard
                            key={product.id}
                            product={product}
                            onQuickView={handleQuickViewOpen} 
                        />
                    ))}
                </div>

                <h1 className="primary-header">Бүх бүтээгдэхүүн</h1>
                <div className="product-list flex flex-wrap p-2 gap-4 rounded-lg mb-8">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onQuickView={handleQuickViewOpen} 
                        />
                    ))}
                </div>
            </div>

            {/* --- Quick View --- */}
            {isQuickViewOpen && selectedProductId && (
                <QuickViewModal
                    productId={selectedProductId}
                    onClose={handleQuickViewClose}
                    isOpen={isQuickViewOpen}
                />
            )}
        </main>
    );
};

export default HomePage;