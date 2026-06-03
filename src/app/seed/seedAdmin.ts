/* eslint-disable no-console */
import bcrypt from 'bcrypt';
import prisma from '../../db/db.config';
import { Role } from '@prisma/client';

const seedAdmin = async () => {
  try {
    // Check if admin already exists
    const adminExists = await prisma.user.findUnique({
      where: { email: 'admin@taskflow.com' },
    });

    if (adminExists) {
      console.log('Admin user already exists');
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Create admin user
    const admin = await prisma.user.create({
      data: {
        fullName: 'Admin User',
        email: 'admin@taskflow.com',
        password: hashedPassword,
        role: Role.ADMIN,
        avatar: null,
      },
    });

    console.log('Admin user created successfully:', admin.email);
  } catch (error) {
    console.error('Error seeding admin user:', error);
    throw error;
  }
};

export default seedAdmin;
