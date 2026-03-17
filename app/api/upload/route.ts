import { NextRequest, NextResponse } from 'next/server';
import { uploadFile } from '@/lib/minio';

const BUCKET_NAME = process.env.MINIO_BUCKET || 'study-abroad-documents';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name}`;
    const contentType = file.type || 'application/octet-stream';

    const url = await uploadFile(BUCKET_NAME, fileName, buffer, contentType);

    return NextResponse.json({ url, fileName });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}

