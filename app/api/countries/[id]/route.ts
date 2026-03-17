import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name, code, description, flagUrl } = body;

    const country = await prisma.country.update({
      where: { id: params.id },
      data: {
        name,
        code,
        description,
        flagUrl,
      },
    });

    return NextResponse.json({ country });
  } catch (error) {
    console.error('Country update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.country.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Country deleted successfully' });
  } catch (error) {
    console.error('Country deletion error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

