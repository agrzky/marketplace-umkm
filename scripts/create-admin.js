// Script untuk membuat user admin
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
require('dotenv').config();

const prisma = new PrismaClient();

async function main() {
  try {
    // Cek apakah admin sudah ada
    const existingAdmin = await prisma.user.findFirst({
      where: {
        email: 'admin@marketplace.com',
        role: 'ADMIN'
      }
    });

    if (existingAdmin) {
      console.log('Admin user sudah ada!');
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Buat user admin
    const admin = await prisma.user.create({
      data: {
        email: 'admin@marketplace.com',
        firstName: 'Admin',
        lastName: 'Marketplace',
        password: hashedPassword,
        role: 'ADMIN'
      }
    });

    console.log('Admin user berhasil dibuat:', admin);
  } catch (error) {
    console.error('Error membuat admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();