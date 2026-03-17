import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const countryId = searchParams.get('countryId');
    const universityId = searchParams.get('universityId');

    const scholarships = await prisma.scholarship.findMany({
      where: {
        active: true,
        ...(countryId && { countryId }),
        ...(universityId && { universityId }),
      },
      include: {
        country: true,
        university: true,
        program: true,
      },
      orderBy: {
        amount: 'desc',
      },
    });

    return NextResponse.json({ scholarships });
  } catch (error) {
    console.error('Scholarships fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      amount,
      currency,
      countryId,
      universityId,
      programId,
      deadline,
      requirements,
      link,
    } = body;

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    const scholarship = await prisma.scholarship.create({
      data: {
        title,
        description,
        amount,
        currency: currency || 'USD',
        countryId,
        universityId,
        programId,
        deadline: deadline ? new Date(deadline) : null,
        requirements,
        link,
        active: true,
      },
      include: {
        country: true,
        university: true,
        program: true,
      },
    });

    return NextResponse.json({ scholarship }, { status: 201 });
  } catch (error) {
    console.error('Scholarship creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

