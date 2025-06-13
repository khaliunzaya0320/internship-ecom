'use client';

import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
    images: string[];
    onImagesChange: (images: string[]) => void;
    maxImages?: number;
}

export default function ImageUpload({
    images,
    onImagesChange,
    maxImages = 5,
}: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        // Check if adding files would exceed maxImages
        if (images.length + files.length > maxImages) {
            alert(`Хамгийн ихдээ ${maxImages} зураг оруулж болно`);
            return;
        }

        setUploading(true);

        try {
            const uploadPromises = files.map(async (file) => {
                const formData = new FormData();
                formData.append('file', file);

                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error('Upload failed');
                }

                const data = await response.json();
                return data.url;
            });

            const uploadedUrls = await Promise.all(uploadPromises);
            onImagesChange([...images, ...uploadedUrls]);
        } catch (error) {
            console.error('Upload error:', error);
            alert('Зураг оруулахад алдаа гарлаа');
        } finally {
            setUploading(false);
        }
    };

    const removeImage = (index: number) => {
        const newImages = images.filter((_, i) => i !== index);
        onImagesChange(newImages);
    };

    const moveImage = (fromIndex: number, toIndex: number) => {
        const newImages = [...images];
        const [removed] = newImages.splice(fromIndex, 1);
        newImages.splice(toIndex, 0, removed);
        onImagesChange(newImages);
    };

    return (
        <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
                Зургууд ({images.length}/{maxImages})
            </label>

            {/* Image Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="relative group border-2 border-dashed border-gray-300 rounded-lg p-2"
                    >
                        <img
                            src={image}
                            alt={`Product ${index + 1}`}
                            className="w-full h-24 object-cover rounded"
                        />

                        {/* Primary badge */}
                        {index === 0 && (
                            <div className="absolute top-1 left-1 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                                Үндсэн
                            </div>
                        )}

                        {/* Remove button */}
                        <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <X className="w-3 h-3" />
                        </button>

                        {/* Move buttons */}
                        <div className="absolute bottom-1 right-1 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {index > 0 && (
                                <button
                                    type="button"
                                    onClick={() => moveImage(index, index - 1)}
                                    className="bg-gray-600 text-white rounded px-1 text-xs"
                                >
                                    ←
                                </button>
                            )}
                            {index < images.length - 1 && (
                                <button
                                    type="button"
                                    onClick={() => moveImage(index, index + 1)}
                                    className="bg-gray-600 text-white rounded px-1 text-xs"
                                >
                                    →
                                </button>
                            )}
                        </div>
                    </div>
                ))}

                {/* Upload button */}
                {images.length < maxImages && (
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="border-2 border-dashed border-gray-300 rounded-lg h-24 flex flex-col items-center justify-center text-gray-500 hover:border-gray-400 hover:text-gray-600 disabled:opacity-50"
                    >
                        {uploading ? (
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                        ) : (
                            <>
                                <Upload className="w-6 h-6 mb-1" />
                                <span className="text-xs">Зураг нэмэх</span>
                            </>
                        )}
                    </button>
                )}
            </div>

            {/* File Input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileSelect}
                className="hidden"
            />

            {/* Help text */}
            <p className="text-sm text-gray-500">
                Эхний зураг үндсэн зураг болно. Зурагны дарааллыг солих бол дээр
                доош товчийг ашиглана уу.
            </p>
        </div>
    );
}
