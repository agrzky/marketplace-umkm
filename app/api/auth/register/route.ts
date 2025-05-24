import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { hash } from 'bcrypt';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, firstName, lastName, password } = body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email sudah terdaftar' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create new user
    const user = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        password: hashedPassword,
      },
    });

    const { password: _, ...result } = user;

    return NextResponse.json(
      { message: 'User berhasil dibuat', user: result },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat registrasi' },
      { status: 500 }
    );
  }
}