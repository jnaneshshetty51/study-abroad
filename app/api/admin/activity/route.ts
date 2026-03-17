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

    // Get recent activities from various sources
    const [recentInquiries, recentApplications, recentUsers] = await Promise.all([
      prisma.inquiry.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { service: true, user: { select: { name: true, email: true } } },
      }),
      prisma.application.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          university: true,
          program: true,
          user: { select: { name: true, email: true } },
        },
      }),
      prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: { id: true, name: true, email: true, createdAt: true },
      }),
    ]);

    const activities = [
      ...recentInquiries.map((inq) => ({
        title: `New Inquiry: ${inq.service.name}`,
        description: `From ${inq.name} (${inq.email})`,
        createdAt: inq.createdAt,
        type: 'inquiry',
      })),
      ...recentApplications.map((app) => ({
        title: `New Application: ${app.university.name}`,
        description: `${app.program.name} - ${app.user.name}`,
        createdAt: app.createdAt,
        type: 'application',
      })),
      ...recentUsers.map((usr) => ({
        title: `New User Registered`,
        description: `${usr.name} (${usr.email})`,
        createdAt: usr.createdAt,
        type: 'user',
      })),
    ]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 10);

    return NextResponse.json({ activities });
  } catch (error) {
    console.error('Activity fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

