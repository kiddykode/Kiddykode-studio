import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('--- SEEDING CREATE MODE (PREMIUM) ---');

  // 1. Capstone Project: Build Your Own Startup App
  const capstoneProject = await prisma.course.create({
    data: {
      title: 'Capstone: Build Your Mini-SaaS',
      description: 'The ultimate transformation. Bring your own idea to life from proposal to presentation.',
      type: 'CREATE',
      tierRequired: 'BUILDER',
      modules: {
        create: {
          title: 'Project Lifecycle',
          order: 1,
          lessons: {
            create: {
              title: 'SaaS Development Track',
              order: 1,
              phases: {
                createMany: {
                  data: [
                    {
                      type: 'PROPOSAL',
                      title: 'Project Proposal Form',
                      order: 1,
                      content: {
                        instructions: 'What are you building? Define the problem, target audience, and tech stack.',
                        fields: [
                          { label: 'Project Name', type: 'text', required: true },
                          { label: 'Problem Statement', type: 'textarea', required: true },
                          { label: 'Planned Tech Stack', type: 'text', placeholder: 'e.g. React, Hono, Prisma' }
                        ]
                      }
                    },
                    {
                      type: 'FACILITATOR_REVIEW',
                      title: 'Clearance & Logic Review',
                      order: 2,
                      content: {
                        instructions: 'A facilitator will review your proposal. You cannot proceed until approved.',
                        waitingMessage: 'Your proposal is currently being researched by our team...'
                      }
                    },
                    {
                      type: 'MILESTONE',
                      title: 'Build Milestone 1: Core Engine',
                      order: 3,
                      content: {
                        instructions: 'Implement the database schema and basic API routes.',
                        objectives: [
                          'Define Prisma models',
                          'Create at least 3 API endpoints',
                          'Test the logic'
                        ]
                      }
                    },
                    {
                      type: 'FEEDBACK',
                      title: 'Milestone 1 Feedback',
                      order: 4,
                      content: {
                        instructions: 'Review comments from your mentor and adjust the architecture if needed.'
                      }
                    },
                    {
                      type: 'MILESTONE',
                      title: 'Build Milestone 2: User Interface',
                      order: 5,
                      content: {
                        instructions: 'Build the frontend components and integrate with your API.',
                        objectives: [
                          'Build the main dashboard UI',
                          'Implement data fetching from your API',
                          'Apply KiddyKode aesthetics'
                        ]
                      }
                    },
                    {
                      type: 'FINAL_SUBMISSION',
                      title: 'Final Technical Submission',
                      order: 6,
                      content: {
                        instructions: 'Submit your GitHub repository link and deployed URL for final audit.',
                        requirements: [
                          'Full source code access',
                          'README documentation',
                          'Working demo link'
                        ]
                      }
                    },
                    {
                      type: 'PRESENT',
                      title: 'The Grand Presentation',
                      order: 7,
                      content: {
                        instructions: 'Record a 3-minute video showing your work and explaining your code logic.',
                        videoRequirements: [
                          'Show the working app',
                          'Explain one complex function',
                          'Reflect on what you learned'
                        ]
                      }
                    }
                  ]
                }
              }
            }
          }
        }
      }
    }
  });

  console.log('Create Mode Project Seeded:');
  console.log('- Premium Capstone:', capstoneProject.title);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
