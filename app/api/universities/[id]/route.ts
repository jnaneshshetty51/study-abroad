import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name, countryId, description, website, logoUrl, commission, ranking } = body;

    const university = await prisma.university.update({
      where: { id: params.id },
      data: {
        name,
        countryId,
        description,
        website,
        logoUrl,
        commission: commission || 0,
        ranking,
      },
      include: {
        country: true,
      },
    });

    return NextResponse.json({ university });
  } catch (error) {
    console.error('University update error:', error);
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
    await prisma.university.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'University deleted successfully' });
  } catch (error) {
    console.error('University deletion error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

