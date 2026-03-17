import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const countryId = searchParams.get('countryId');
    const universityId = searchParams.get('universityId');
    const degree = searchParams.get('degree');
    const language = searchParams.get('language');
    const minTuition = searchParams.get('minTuition');
    const maxTuition = searchParams.get('maxTuition');
    const ieltsMin = searchParams.get('ieltsMin');
    const search = searchParams.get('search');
    const ids = searchParams.get('ids');

    const where: any = {};

    if (ids) {
      const idArray = ids.split(',');
      where.id = { in: idArray };
    } else {
      if (countryId) {
        where.university = { countryId };
      }
      if (universityId) {
        where.universityId = universityId;
      }
      if (degree) {
        where.degree = degree;
      }
      if (language) {
        where.language = language;
      }
      if (minTuition || maxTuition) {
        where.tuitionFee = {};
        if (minTuition) where.tuitionFee.gte = parseFloat(minTuition);
        if (maxTuition) where.tuitionFee.lte = parseFloat(maxTuition);
      }
      if (ieltsMin) {
        where.ieltsRequired = { gte: parseFloat(ieltsMin) };
      }
      if (search) {
        where.OR = [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          { university: { name: { contains: search, mode: 'insensitive' } } },
        ];
      }
    }

    const programs = await prisma.program.findMany({
      where,
      include: {
        university: {
          include: {
            country: true,
          },
        },
      },
      orderBy: {
        tuitionFee: 'asc',
      },
    });

    return NextResponse.json({ programs });
  } catch (error) {
    console.error('Programs fetch error:', error);
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
      universityId,
      name,
      degree,
      duration,
      tuitionFee,
      currency,
      description,
      requirements,
      intakeMonths,
      language,
      ieltsRequired,
      toeflRequired,
      gpaRequired,
      applicationDeadline,
    } = body;

    if (!universityId || !name || !degree || !duration) {
      return NextResponse.json(
        { error: 'University, name, degree, and duration are required' },
        { status: 400 }
      );
    }

    const program = await prisma.program.create({
      data: {
        universityId,
        name,
        degree,
        duration,
        tuitionFee,
        currency: currency || 'USD',
        description,
        requirements: requirements ? JSON.stringify(requirements) : null,
        intakeMonths: intakeMonths ? JSON.stringify(intakeMonths) : null,
        language: language || 'English',
        ieltsRequired,
        toeflRequired,
        gpaRequired,
        applicationDeadline: applicationDeadline ? new Date(applicationDeadline) : null,
      },
      include: {
        university: {
          include: {
            country: true,
          },
        },
      },
    });

    return NextResponse.json({ program }, { status: 201 });
  } catch (error) {
    console.error('Program creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

