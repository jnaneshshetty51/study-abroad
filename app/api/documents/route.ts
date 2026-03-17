import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromToken } from '@/lib/auth';
import { uploadFile } from '@/lib/minio';

const BUCKET_NAME = process.env.MINIO_BUCKET || 'study-abroad-documents';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;
    const user = token ? await getUserFromToken(token) : null;

    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const documents = await prisma.document.findMany({
      where: {
        userId: user.id,
      },
      include: {
        application: {
          select: {
            id: true,
            university: { select: { name: true } },
            program: { select: { name: true } },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ documents });
  } catch (error) {
    console.error('Documents fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;
    const user = token ? await getUserFromToken(token) : null;

    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string;
    const name = formData.get('name') as string;
    const applicationId = formData.get('applicationId') as string | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${user.id}/${Date.now()}-${file.name}`;
    const contentType = file.type || 'application/octet-stream';

    const url = await uploadFile(BUCKET_NAME, fileName, buffer, contentType);

    const document = await prisma.document.create({
      data: {
        userId: user.id,
        name: name || file.name,
        type: type || 'general',
        url,
        size: file.size,
        mimeType: contentType,
        applicationId: applicationId || null,
      },
    });

    return NextResponse.json({ document }, { status: 201 });
  } catch (error) {
    console.error('Document upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload document' },
      { status: 500 }
    );
  }
}

