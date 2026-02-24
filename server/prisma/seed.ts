import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding test users...');

  const testUsers = [
    {
      email: 'explorer@kiddykode.com',
      name: 'Eddie Explorer',
      role: 'EXPLORER',
      subscriptionStatus: 'FREE',
    },
    {
      email: 'builder@kiddykode.com',
      name: 'Bob Builder',
      role: 'BUILDER',
      subscriptionStatus: 'ACTIVE',
    },
    {
      email: 'creator@kiddykode.com',
      name: 'Charlie Creator',
      role: 'CREATOR_ELITE',
      subscriptionStatus: 'ACTIVE',
    },
    {
      email: 'teacher@kiddykode.com',
      name: 'Tanya Teacher',
      role: 'FACILITATOR',
      subscriptionStatus: 'ACTIVE',
    },
    {
      email: 'admin@kiddykode.com',
      name: 'Alice Admin',
      role: 'ADMIN',
      subscriptionStatus: 'ACTIVE',
    }
  ];

  for (const user of testUsers) {
    const upserted = await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        email: user.email,
        name: user.name,
        role: user.role as any,
        subscriptionStatus: user.subscriptionStatus as any,
      },
    });
    console.log(`  ✅ Created/Verified user: ${upserted.name} (${upserted.role})`);
  }

  console.log('🚀 Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
