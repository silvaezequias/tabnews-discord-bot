const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: { userId: '367725991994458115' },
  });
}

main().then(() => {
  prisma.$disconnect();
});