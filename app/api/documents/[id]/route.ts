import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromToken } from '@/lib/auth';
import { deleteFile } from '@/lib/minio';

const BUCKET_NAME = process.env.MINIO_BUCKET || 'study-abroad-documents';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.cookies.get('token')?.value;
    const user = token ? await getUserFromToken(token) : null;

    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const document = await prisma.document.findUnique({
      where: { id: params.id },
    });

    if (!document || document.userId !== user.id) {
      return NextResponse.json(
        { error: 'Document not found or unauthorized' },
        { status: 404 }
      );
    }

    // Extract object name from URL
    const urlParts = document.url.split('/');
    const objectName = urlParts.slice(-2).join('/'); // Get last two parts (userId/filename)

    try {
      await deleteFile(BUCKET_NAME, objectName);
    } catch (error) {
      console.error('Error deleting file from MinIO:', error);
      // Continue with database deletion even if file deletion fails
    }

    await prisma.document.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error('Document deletion error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

