import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const countryId = searchParams.get('countryId');

    const universities = await prisma.university.findMany({
      where: countryId ? { countryId } : undefined,
      include: {
        country: true,
        programs: true,
        _count: {
          select: {
            programs: true,
          },
        },
      },
      orderBy: {
        commission: 'desc', // Show highest commission first
      },
    });

    return NextResponse.json({ universities });
  } catch (error) {
    console.error('Universities fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, countryId, description, website, logoUrl, commission, ranking } = body;

    if (!name || !countryId) {
      return NextResponse.json(
        { error: 'Name and country are required' },
        { status: 400 }
      );
    }

    const university = await prisma.university.create({
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

    return NextResponse.json({ university }, { status: 201 });
  } catch (error) {
    console.error('University creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

