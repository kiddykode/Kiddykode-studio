import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Learn Mode Content...');

  // 1. Create a Learn Course
  const pythonCourse = await prisma.course.upsert({
    where: { id: 'intro-to-python' },
    update: {},
    create: {
      id: 'intro-to-python',
      title: 'Intro to Python',
      description: 'Master the basics of Python through stories and games.',
      type: 'LEARN',
      tierRequired: 'EXPLORER',
      modules: {
        create: [
          {
            id: 'py-mod-1',
            title: 'Module 1: The Magic of Variables',
            order: 1,
            lessons: {
              create: {
                id: 'py-les-1',
                title: 'Lesson 1: What is a Variable?',
                order: 1,
                phases: {
                  create: [
                    { type: 'STORY', title: 'The Potion Master', order: 1, content: { videoUrl: '...' } },
                    { type: 'LOGIC', title: 'Storing Ingredients', order: 2, content: { blueprint: '...' } },
                    { type: 'BUILD', title: 'Practice Lab', order: 3, content: { tutorial: '...' } },
                    { type: 'IMPROVE', title: 'Mini Project: Potion Mixer', order: 4, content: { challenge: '...' } }
                  ]
                }
              }
            }
          },
          {
            id: 'py-mod-2',
            title: 'Module 2: Loops and Repetition',
            order: 2,
            lessons: {
              create: {
                id: 'py-les-2',
                title: 'Lesson 2: For Loops',
                order: 1,
                phases: {
                  create: [
                    { type: 'STORY', title: 'The Endless Forest', order: 1, content: { videoUrl: '...' } },
                    { type: 'LOGIC', title: 'Walking in Circles', order: 2, content: { blueprint: '...' } },
                    { type: 'BUILD', title: 'Practice Lab', order: 3, content: { tutorial: '...' } },
                    { type: 'IMPROVE', title: 'Mini Project: Forest Maze', order: 4, content: { challenge: '...' } }
                  ]
                }
              }
            }
          },
          {
            id: 'py-mod-3',
            title: 'Module 3: Conditional Logic', // This should be LOCKED for Explorer
            order: 3,
            lessons: {
              create: {
                id: 'py-les-3',
                title: 'Lesson 3: If Statements',
                order: 1,
                phases: {
                  create: [
                    { type: 'STORY', title: 'The Fork in the Road', order: 1, content: { videoUrl: '...' } },
                    { type: 'LOGIC', title: 'Making Choices', order: 2, content: { blueprint: '...' } },
                    { type: 'BUILD', title: 'Practice Lab', order: 3, content: { tutorial: '...' } },
                    { type: 'IMPROVE', title: 'Mini Project: Choice Adventure', order: 4, content: { challenge: '...' } }
                  ]
                }
              }
            }
          }
        ]
      },
      badges: {
        create: {
          id: 'python-master-badge',
          name: 'Python Apprentice',
          description: 'Completed the Intro to Python course!',
          icon: '🐍'
        }
      }
    }
  });

  console.log(`✅ Seeded Learn Course: ${pythonCourse.title}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
