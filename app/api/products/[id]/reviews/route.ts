import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

// Get product reviews
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const reviews = await prisma.review.findMany({
      where: { productId: params.id },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengambil data ulasan' },
      { status: 500 }
    );
  }
}

// Create product review
export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { rating, comment, userId } = body;

    // Check if user has already reviewed this product
    const existingReview = await prisma.review.findFirst({
      where: {
        productId: params.id,
        userId: userId,
      },
    });

    if (existingReview) {
      return NextResponse.json(
        { error: 'Anda sudah memberikan ulasan untuk produk ini' },
        { status: 400 }
      );
    }

    const review = await prisma.review.create({
      data: {
        rating,
        comment,
        productId: params.id,
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    // Update product rating
    const reviews = await prisma.review.findMany({
      where: { productId: params.id },
      select: { rating: true },
    });

    const averageRating =
      reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length;

    await prisma.product.update({
      where: { id: params.id },
      data: { rating: averageRating },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat membuat ulasan' },
      { status: 500 }
    );
  }
}