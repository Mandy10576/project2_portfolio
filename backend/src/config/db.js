/**
 * Database Configuration (Prisma Client)
 * ---------------------------------------
 * This file initializes a single instance of PrismaClient.
 * Prisma handles database connections to PostgreSQL automatically.
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
});

export default prisma;
