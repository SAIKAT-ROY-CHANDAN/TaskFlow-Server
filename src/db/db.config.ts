import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['error'],
  });

globalForPrisma.prisma = prisma;

export default prisma;


// import { PrismaClient } from '@prisma/client';

// const prisma: PrismaClient = new PrismaClient({
//   log: ['error'],
// });

// export default prisma;