import Image from 'next/image';
import { useState } from 'react';

interface ProductImagesProps {
    imageUrl?: string;
}

const ProductImages = ({ imageUrl }: ProductImagesProps) => {
    const defaultImages = [
        {
            id: 1,
            url: '/product1.webp',
        },
        {
            id: 2,
            url: 'https://pretties.com.hk/cdn/shop/files/AXY-610249_1__website.jpg?v=1702543884',
        },
        {
            id: 3,
            url: 'https://shopdama.ca/cdn/shop/files/AXISYTheSpotDifferenceBlemishTreatment.png?v=1703284071&width=750',
        },
        {
            id: 4,
            url: '/product1.webp',
        },
    ];

    // Use provided imageUrl or default images
    const images = imageUrl ? [{ id: 1, url: imageUrl }] : defaultImages;
    const [index, setIndex] = useState(0);

    return (
        <div className="m-4">
            <div className="relative h-[500px]">
                <Image
                    src={images[index].url}
                    alt=""
                    fill
                    sizes="50vw"
                    className="object-cover rounded-md"
                />
            </div>
            {images.length > 1 && (
                <div className="flex justify-between gap-4 cursor-pointer">
                    {images.map((img, i) => (
                        <div
                            className="w-1/4 h-32  gap-4 mt-4 relative"
                            key={img.id}
                            onClick={() => setIndex(i)}
                        >
                            <Image
                                src={img.url}
                                alt=""
                                fill
                                sizes="50vw"
                                className="object-cover rounded-md"
                            />
                        </div>
                    ))}
                </div>
            )}{' '}
        </div>
    );
};

export default ProductImages;
