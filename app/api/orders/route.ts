import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

// Get user orders
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const skip = (page - 1) * limit;

    const orders = await prisma.order.findMany({
      where: { userId: userId || undefined },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
    });

    const total = await prisma.order.count({
      where: { userId: userId || undefined },
    });

    return NextResponse.json({
      orders,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit,
      },
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengambil data pesanan' },
      { status: 500 }
    );
  }
}

// Create new order
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, items } = body;

    // Calculate total price
    let total = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });

      if (!product) {
        return NextResponse.json(
          { error: `Produk dengan ID ${item.productId} tidak ditemukan` },
          { status: 404 }
        );
      }

      total += product.price * item.quantity;
      orderItems.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
      });
    }

    const order = await prisma.order.create({
      data: {
        userId,
        total,
        items: {
          create: orderItems,
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat membuat pesanan' },
      { status: 500 }
    );
  }
}