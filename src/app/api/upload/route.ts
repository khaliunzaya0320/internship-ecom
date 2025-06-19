// import { NextRequest, NextResponse } from 'next/server';
// import { writeFile, mkdir } from 'fs/promises';
// import { join } from 'path';
// import { existsSync } from 'fs';

// export async function POST(request: NextRequest) {
//     try {
//         const data = await request.formData();
//         const files: File[] = data.getAll('files') as File[];
//         const singleFile = data.get('file') as File;

//         // Handle both single file and multiple files
//         const filesToProcess =
//             files.length > 0 ? files : singleFile ? [singleFile] : [];

//         if (!filesToProcess || filesToProcess.length === 0) {
//             return NextResponse.json(
//                 { error: 'No files uploaded' },
//                 { status: 400 },
//             );
//         }

//         // Ensure upload directory exists
//         const uploadDir = join(process.cwd(), 'public', 'uploads', 'product');
//         if (!existsSync(uploadDir)) {
//             await mkdir(uploadDir, { recursive: true });
//         }

//         const uploadedFiles: { fileName: string; url: string }[] = [];

//         for (const file of filesToProcess) {
//             if (!file.type.startsWith('image/')) {
//                 continue; // Skip non-image files
//             }

//             const bytes = await file.arrayBuffer();
//             const buffer = Buffer.from(bytes);

//             // Generate unique filename
//             const timestamp = Date.now();
//             const randomString = Math.random().toString(36).substring(2, 15);
//             const extension = file.name.split('.').pop() || 'jpg';
//             const fileName = `${timestamp}-${randomString}.${extension}`;

//             const filePath = join(uploadDir, fileName);
//             await writeFile(filePath, buffer);

//             uploadedFiles.push({
//                 fileName,
//                 url: `/uploads/product/${fileName}`,
//             });
//         }

//         return NextResponse.json({
//             success: true,
//             files: uploadedFiles,
//             // For single file uploads, also return the URL directly
//             url: uploadedFiles.length === 1 ? uploadedFiles[0].url : undefined,
//         });
//     } catch (error) {
//         console.error('Upload error:', error);
//         return NextResponse.json(
//             { error: 'Failed to upload files' },
//             { status: 500 },
//         );
//     }
// }

import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary'; 
import { getServerSession } from 'next-auth'; 
import { authOptions } from '@/lib/auth'; 

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryUploadResult {
    secure_url: string;
    public_id: string; 
    version: number;
    signature: string;
    width: number;
    height: number;
    format: string;
    resource_type: string;
    created_at: string;
    bytes: number;
    type: string;
    etag: string;
    placeholder: boolean;
    url: string; 
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user?.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const formData = await request.formData();
        const files: File[] = formData.getAll('files') as File[];
        const singleFile = formData.get('file') as File;

        const filesToProcess =
            files.length > 0 ? files : singleFile ? [singleFile] : [];

        if (!filesToProcess || filesToProcess.length === 0) {
            return NextResponse.json(
                { error: 'No files uploaded' },
                { status: 400 },
            );
        }

        const uploadedFileDetails: { fileName: string; url: string }[] = [];

        for (const file of filesToProcess) {
            if (!file.type.startsWith('image/')) {
                console.warn(`Skipping non-image file: ${file.name}`);
                continue; 
            }

            const MAX_FILE_SIZE = 5 * 1024 * 1024; 
            if (file.size > MAX_FILE_SIZE) {
                console.warn(`Skipping large file: ${file.name} (Size: ${file.size / (1024 * 1024)}MB)`);
                return NextResponse.json(
                    { error: `File "${file.name}" is too large. Max size is 5MB.` },
                    { status: 400 }
                );
            }

            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const result: CloudinaryUploadResult = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: "product_images" }, 
                    (error: any, result: any) => {
                        if (error) {
                            console.error("Cloudinary upload stream error:", error);
                            return reject(error);
                        }
                        resolve(result as CloudinaryUploadResult); 
                    }
                ).end(buffer); 
            });

            uploadedFileDetails.push({
                fileName: file.name,
                url: result.secure_url, 
            });
        }

        return NextResponse.json({
            success: true,
            files: uploadedFileDetails,
            url: uploadedFileDetails.length === 1 ? uploadedFileDetails[0].url : undefined,
        }, { status: 200 });

    } catch (error) {
        console.error('API Error: Failed to upload files to Cloudinary:', error);
        return NextResponse.json(
            { error: 'Failed to upload files', details: error instanceof Error ? error.message : 'Unknown server error' },
            { status: 500 },
        );
    }
}

