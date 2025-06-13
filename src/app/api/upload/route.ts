import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        const files: File[] = data.getAll('files') as File[];
        const singleFile = data.get('file') as File;

        // Handle both single file and multiple files
        const filesToProcess =
            files.length > 0 ? files : singleFile ? [singleFile] : [];

        if (!filesToProcess || filesToProcess.length === 0) {
            return NextResponse.json(
                { error: 'No files uploaded' },
                { status: 400 },
            );
        }

        // Ensure upload directory exists
        const uploadDir = join(process.cwd(), 'public', 'uploads', 'product');
        if (!existsSync(uploadDir)) {
            await mkdir(uploadDir, { recursive: true });
        }

        const uploadedFiles: { fileName: string; url: string }[] = [];

        for (const file of filesToProcess) {
            if (!file.type.startsWith('image/')) {
                continue; // Skip non-image files
            }

            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            // Generate unique filename
            const timestamp = Date.now();
            const randomString = Math.random().toString(36).substring(2, 15);
            const extension = file.name.split('.').pop() || 'jpg';
            const fileName = `${timestamp}-${randomString}.${extension}`;

            const filePath = join(uploadDir, fileName);
            await writeFile(filePath, buffer);

            uploadedFiles.push({
                fileName,
                url: `/uploads/product/${fileName}`,
            });
        }

        return NextResponse.json({
            success: true,
            files: uploadedFiles,
            // For single file uploads, also return the URL directly
            url: uploadedFiles.length === 1 ? uploadedFiles[0].url : undefined,
        });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { error: 'Failed to upload files' },
            { status: 500 },
        );
    }
}
