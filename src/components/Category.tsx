'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
    Smartphone,
    Baby,
    Gamepad2,
    BookOpen,
    Brush,
    HeartPulse,
    Home,
    Dumbbell,
    User,
    Gem,
    EggFried,
    Plug,
    Star,
    Package,
    Shirt,
    Watch,
    Car,
    Music,
    Camera,
    Utensils,
} from 'lucide-react';
import { Category as CategoryType } from '@/types';

// Icon mapping for different category names
const getIconForCategory = (categoryName: string) => {
    const name = categoryName.toLowerCase();

    if (name.includes('эмэгтэй') || name.includes('women'))
        return <User size={40} />;
    if (name.includes('эрэгтэй') || name.includes('men'))
        return <User size={40} />;
    if (
        name.includes('хүүхэд') ||
        name.includes('kids') ||
        name.includes('baby')
    )
        return <Baby size={40} />;
    if (
        name.includes('технологи') ||
        name.includes('technology') ||
        name.includes('tech')
    )
        return <Smartphone size={40} />;
    if (
        name.includes('спорт') ||
        name.includes('sport') ||
        name.includes('fitness')
    )
        return <Dumbbell size={40} />;
    if (
        name.includes('гоёл') ||
        name.includes('jewelry') ||
        name.includes('accessories')
    )
        return <Gem size={40} />;
    if (name.includes('гэр') || name.includes('home') || name.includes('house'))
        return <Home size={40} />;
    if (name.includes('хүнс') || name.includes('food') || name.includes('хоол'))
        return <EggFried size={40} />;
    if (
        name.includes('цахилгаан') ||
        name.includes('electronics') ||
        name.includes('electric')
    )
        return <Plug size={40} />;
    if (
        name.includes('эрүүл') ||
        name.includes('health') ||
        name.includes('medical')
    )
        return <HeartPulse size={40} />;
    if (
        name.includes('гоо') ||
        name.includes('beauty') ||
        name.includes('skincare') ||
        name.includes('makeup')
    )
        return <Brush size={40} />;
    if (
        name.includes('бичиг') ||
        name.includes('stationary') ||
        name.includes('office')
    )
        return <BookOpen size={40} />;
    if (
        name.includes('тоглоом') ||
        name.includes('game') ||
        name.includes('toy')
    )
        return <Gamepad2 size={40} />;
    if (
        name.includes('хувцас') ||
        name.includes('clothing') ||
        name.includes('fashion')
    )
        return <Shirt size={40} />;
    if (name.includes('цаг') || name.includes('watch') || name.includes('time'))
        return <Watch size={40} />;
    if (name.includes('машин') || name.includes('car') || name.includes('auto'))
        return <Car size={40} />;
    if (
        name.includes('хөгжим') ||
        name.includes('music') ||
        name.includes('audio')
    )
        return <Music size={40} />;
    if (
        name.includes('зураг') ||
        name.includes('camera') ||
        name.includes('photo')
    )
        return <Camera size={40} />;
    if (
        name.includes('хоол') ||
        name.includes('restaurant') ||
        name.includes('dining')
    )
        return <Utensils size={40} />;
    if (name.includes('fragrance') || name.includes('үнэртэн'))
        return <Star size={40} />;

    // Default icon
    return <Package size={40} />;
};

interface CategoryProps {
    layout?: 'row' | 'grid';
}

const Category = ({ layout = 'row' }: CategoryProps) => {
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFeaturedCategories();
    }, []);

    const fetchFeaturedCategories = async () => {
        try {
            const response = await fetch('/api/category/featured');
            if (response.ok) {
                const data = await response.json();
                setCategories(data);
            }
        } catch (error) {
            console.error('Error fetching featured categories:', error);
        } finally {
            setLoading(false);
        }
    };

    const containerClass =
        layout === 'grid' ? 'grid grid-cols-2 gap-y-2 gap-x-28' : 'flex gap-4';

    if (loading) {
        return (
            <div className={containerClass}>
                {[...Array(6)].map((_, index) => (
                    <div
                        key={index}
                        className="h-28 w-24 bg-gray-200 rounded-xl animate-pulse"
                    />
                ))}
            </div>
        );
    }

    if (categories.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500">Онцлох ангилал байхгүй байна</p>
            </div>
        );
    }

    return (
        <div className={containerClass}>
            {categories.map((category) => (
                <Link
                    key={category.id}
                    href={`/shop/products?categoryId=${category.id}`}
                    className="w-full"
                >
                    <div className="h-28 w-24 flex flex-col items-center justify-center bg-white border rounded-xl shadow-sm hover:shadow-md hover:text-rose-500 transition-all duration-200">
                        <div className="text-primary">
                            {getIconForCategory(category.name)}
                        </div>
                        <h2 className="text-sm text-center mt-2 px-1 line-clamp-2">
                            {category.name}
                        </h2>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Category;
