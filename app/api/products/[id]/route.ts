import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

// Get single product
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        seller: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Produk tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengambil data produk' },
      { status: 500 }
    );
  }
}

// Update product
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { title, description, price, image } = body;

    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        title,
        description,
        price,
        image,
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

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengupdate produk' },
      { status: 500 }
    );
  }
}

// Delete product
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.product.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      { message: 'Produk berhasil dihapus' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat menghapus produk' },
      { status: 500 }
    );
  }
}