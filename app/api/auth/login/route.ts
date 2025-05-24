import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // Find user by email
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Email atau password salah' },
        { status: 401 }
      );
    }

    // Compare password
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: 'Email atau password salah' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      {
        message: 'Login berhasil',
        user: userWithoutPassword,
        token: token,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat login' },
      { status: 500 }
    );
  }
}