import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

// Get all products
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';

    const skip = (page - 1) * limit;

    const products = await prisma.product.findMany({
      where: {
        OR: [
          { title: { contains: search } },
          { description: { contains: search } },
        ],
      },
      include: {
        seller: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        reviews: true,
      },
      skip,
      take: limit,
    });

    const total = await prisma.product.count({
      where: {
        OR: [
          { title: { contains: search } },
          { description: { contains: search } },
        ],
      },
    });

    return NextResponse.json({
      products,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit,
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengambil data produk' },
      { status: 500 }
    );
  }
}

// Create new product
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, price, image, sellerId } = body;

    const product = await prisma.product.create({
      data: {
        title,
        description,
        price,
        image,
        sellerId,
      },
      include: {
        seller: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat membuat produk' },
      { status: 500 }
    );
  }
}