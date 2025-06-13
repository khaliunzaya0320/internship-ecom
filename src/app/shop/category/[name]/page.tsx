'use client';

import { useEffect, useState } from 'react';
import Category from '@/components/Category';
import ProductCard from '@/components/ProductCard';

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

interface CategoryPageProps {
    params: {
        id: string;
    };
}

const CategoryPage = ({ params }: CategoryPageProps) => {
    const categoryId = params.id;

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch(`/api/product?category=${categoryId}`);
                const data = await res.json();
                setProducts(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, [categoryId]);

    return (
        <div className="flex items-start gap-4">
            {/* Side menu */}
            <aside className="w-64 min-h-screen bg-white p-4 rounded shadow-sm border-gray-200">
                <div className="grid grid-cols-2">
                    <Category layout="grid" />
                </div>
            </aside>

            {/* Product list */}
            <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </main>
        </div>
    );
};

export default CategoryPage;
