import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Structural Content...');

  // 1. Create a Story Course
  const abiWaterfall = await prisma.course.upsert({
    where: { id: 'abi-waterfall' },
    update: {},
    create: {
      id: 'abi-waterfall',
      title: 'Abi Waterfall Adventure',
      description: 'Restore the flow of the legendary waterfall through code.',
      type: 'STORY',
      tierRequired: 'EXPLORER',
      modules: {
        create: {
          id: 'module-1',
          title: 'Section 1: The Restoration',
          order: 1,
          lessons: {
            create: {
              id: 'mission-1',
              title: 'Mission 1: The Source',
              order: 1,
              phases: {
                create: [
                  {
                    type: 'STORY',
                    title: 'Mission Brief',
                    order: 1,
                    content: { videoUrl: 'https://example.com/story.mp4', instructions: 'Watch the brief.' }
                  },
                  {
                    type: 'LOGIC',
                    title: 'Logic Blueprint',
                    order: 2,
                    content: { worksheetUrl: 'https://example.com/worksheet.pdf', instructions: 'Plan your logic.' }
                  },
                  {
                    type: 'BUILD',
                    title: 'Guided Build',
                    order: 3,
                    content: { tutorialId: 'build-1', instructions: 'Start coding.' }
                  },
                  {
                    type: 'IMPROVE',
                    title: 'System Upgrades',
                    order: 4,
                    content: { challenges: ['Add a timer', 'Add sound'] }
                  },
                  {
                    type: 'PRESENT',
                    title: 'Mission Debrief',
                    order: 5,
                    content: { questions: ['What did you learn?'] }
                  }
                ]
              }
            }
          }
        }
      }
    }
  });

  console.log(`✅ Seeded Course: ${abiWaterfall.title}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
