'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Slider as SliderType } from '@/types';

const Slider = () => {
    const [current, setCurrent] = useState(0);
    const [sliders, setSliders] = useState<SliderType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSliders = async () => {
            try {
                const response = await fetch('/api/slider');
                if (response.ok) {
                    const data = await response.json();
                    setSliders(data);
                }
            } catch (error) {
                console.error('Error fetching sliders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSliders();
    }, []);

    useEffect(() => {
        if (sliders.length > 1) {
            const interval = setInterval(() => {
                setCurrent((prev) => (prev + 1) % sliders.length);
            }, 5000); // Auto-slide every 5 seconds

            return () => clearInterval(interval);
        }
    }, [sliders.length]);

    if (loading) {
        return (
            <div className="h-[calc(100vh-80px)] bg-gray-100 flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (sliders.length === 0) {
        return (
            <div className="h-[calc(100vh-80px)] bg-gradient-to-r from-blue-50 to-yellow-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-3xl font-semibold text-gray-700 mb-4">
                        Welcome to Our Store
                    </h2>
                    <p className="text-gray-600">
                        No sliders available at the moment
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-[calc(100vh-80px)] overflow-hidden relative">
            <div
                className="w-max h-full flex transition-all ease-in-out duration-1000"
                style={{ transform: `translateX(-${current * 100}vw)` }}
            >
                {sliders.map((slide) => (
                    <div
                        className="bg-gradient-to-r from-blue-50 to-yellow-50 w-screen h-full flex flex-col gap-16 xl:flex-row"
                        key={slide.id}
                    >
                        {/* text left */}
                        <div className="w-1/2 xl:h-full flex flex-col items-center justify-center gap-8 2xl:gap-12 text-center px-8">
                            <h1 className="text-5xl font-semibold text-gray-800">
                                {slide.title}
                            </h1>
                            {slide.description && (
                                <p className="text-lg text-gray-600 max-w-lg">
                                    {slide.description}
                                </p>
                            )}
                            {slide.linkUrl && (
                                <Link href={slide.linkUrl}>
                                    <button className="rounded-full bg-rose-500 text-white py-3 px-6 hover:bg-rose-600 transition-colors duration-200">
                                        Худалдан авах
                                    </button>
                                </Link>
                            )}
                        </div>

                        {/* img right */}
                        <div className="w-1/2 h-full relative flex items-center justify-center">
                            <Image
                                src={slide.imageUrl}
                                alt={slide.title}
                                fill
                                sizes="100%"
                                className="object-contain"
                                priority={current === sliders.indexOf(slide)}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation dots */}
            {sliders.length > 1 && (
                <div className="absolute m-auto left-1/2 bottom-8 flex gap-4 transform -translate-x-1/2">
                    {sliders.map((slide, index) => (
                        <button
                            className={`w-3 h-3 rounded-full ring-1 ring-rose-500 cursor-pointer transition-all duration-200 ${
                                current === index
                                    ? 'scale-125 bg-rose-500'
                                    : 'bg-white'
                            }`}
                            key={slide.id}
                            onClick={() => setCurrent(index)}
                        />
                    ))}
                </div>
            )}

            {/* Navigation arrows */}
            {sliders.length > 1 && (
                <>
                    <button
                        onClick={() =>
                            setCurrent(
                                current === 0
                                    ? sliders.length - 1
                                    : current - 1,
                            )
                        }
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200"
                    >
                        <svg
                            className="w-6 h-6 text-gray-700"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </button>
                    <button
                        onClick={() =>
                            setCurrent((current + 1) % sliders.length)
                        }
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200"
                    >
                        <svg
                            className="w-6 h-6 text-gray-700"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                </>
            )}
        </div>
    );
};

export default Slider;
