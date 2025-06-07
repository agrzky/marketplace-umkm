import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getToken } from 'next-auth/jwt';

// Get user reviews
export async function GET(req: Request) {
  try {
    // Get user ID from token
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Decode token to get user ID
    const decoded = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    const userId = decoded.userId;

    const reviews = await prisma.review.findMany({
      where: { userId: userId },
      include: {
        product: {
          select: {
            id: true,
            title: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ reviews });
  } catch (error) {
    console.error('Error fetching user reviews:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengambil data ulasan' },
      { status: 500 }
    );
  }
}