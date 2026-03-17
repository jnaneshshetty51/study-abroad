import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;
    const user = token ? await getUserFromToken(token) : null;

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const [
      totalUsers,
      totalApplications,
      totalInquiries,
      totalUniversities,
      totalScholarships,
      pendingInquiries,
      pendingApplications,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.application.count(),
      prisma.inquiry.count(),
      prisma.university.count(),
      prisma.scholarship.count({ where: { active: true } }),
      prisma.inquiry.count({ where: { status: 'PENDING' } }),
      prisma.application.count({
        where: {
          status: { in: ['DRAFT', 'SUBMITTED', 'UNDER_REVIEW'] },
        },
      }),
    ]);

    // Calculate estimated revenue (based on commission rates)
    const universities = await prisma.university.findMany({
      include: {
        applications: {
          where: { status: 'ACCEPTED' },
        },
      },
    });

    const totalRevenue = universities.reduce((sum, uni) => {
      return sum + (uni.applications.length * uni.commission);
    }, 0);

    const stats = {
      totalUsers,
      totalApplications,
      totalInquiries,
      totalUniversities,
      totalScholarships,
      totalRevenue,
      pendingInquiries,
      pendingApplications,
    };

    return NextResponse.json({ stats });
  } catch (error) {
    console.error('Stats fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

