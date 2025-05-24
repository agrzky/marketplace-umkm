import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { OrderStatus } from '@prisma/client';

// Get single order
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: params.id },
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

    if (!order) {
      return NextResponse.json(
        { error: 'Pesanan tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengambil data pesanan' },
      { status: 500 }
    );
  }
}

// Update order status
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { status } = body;

    // Validate status
    if (!Object.values(OrderStatus).includes(status)) {
      return NextResponse.json(
        { error: 'Status pesanan tidak valid' },
        { status: 400 }
      );
    }

    const order = await prisma.order.update({
      where: { id: params.id },
      data: { status },
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

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengupdate status pesanan' },
      { status: 500 }
    );
  }
}

// Cancel order
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const order = await prisma.order.update({
      where: { id: params.id },
      data: { status: OrderStatus.CANCELLED },
    });

    return NextResponse.json(
      { message: 'Pesanan berhasil dibatalkan' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error cancelling order:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat membatalkan pesanan' },
      { status: 500 }
    );
  }
}