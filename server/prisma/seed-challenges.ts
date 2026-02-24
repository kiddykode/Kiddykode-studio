import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('--- SEEDING CHALLENGE LAB ---');

  // 1. Explorer Challenge: Logic Quiz (Mod 1-2 only)
  const explorerChallenge = await prisma.course.create({
    data: {
      title: 'Logic Puzzle: The Secret Code',
      description: 'Test your basic coding logic and pattern recognition.',
      type: 'CHALLENGE',
      tierRequired: 'EXPLORER',
      modules: {
        create: {
          title: 'Introduction to Logic',
          order: 1,
          lessons: {
            create: {
              title: 'Variable Naming Quiz',
              order: 1,
              phases: {
                createMany: {
                  data: [
                    {
                      type: 'SCENARIO',
                      title: 'The Mystery of the Missing Box',
                      order: 1,
                      content: {
                        instructions: 'Welcome to the lab. A programmer named Abi left a box but forgot what was inside! Solve the logic to find out.',
                        videoUrl: ''
                      }
                    },
                    {
                      type: 'REQUIREMENTS',
                      title: 'Quiz Constraints',
                      order: 2,
                      content: {
                        objectives: [
                          'Identify valid variable names',
                          'Solve the addition logic problem'
                        ]
                      }
                    },
                    {
                      type: 'CHALLENGE_EDITOR',
                      title: 'Variable Logic',
                      order: 3,
                      content: {
                        quiz: [
                          {
                            question: 'Which of these is a valid Python variable name?',
                            options: ['1_apple', 'apple_1', 'apple-1', '@apple'],
                            answer: 'apple_1'
                          }
                        ]
                      }
                    },
                    {
                      type: 'FEEDBACK',
                      title: 'Mission Result',
                      order: 4,
                      content: {
                        successMessage: 'Well done! You have the foundation of a programmer!'
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

  // 2. Builder Challenge: Loop Fixer
  const builderChallenge = await prisma.course.create({
    data: {
      title: 'Challenge: The Infinite Loop',
      description: 'A loop is running forever and draining the village power! Fix it.',
      type: 'CHALLENGE',
      tierRequired: 'BUILDER',
      modules: {
        create: {
          title: 'Advanced Control Flow',
          order: 1,
          lessons: {
            create: {
              title: 'Fixing the Power Loop',
              order: 1,
              phases: {
                createMany: {
                  data: [
                    {
                      type: 'SCENARIO',
                      title: 'Power Station Emergency',
                      order: 1,
                      content: {
                        instructions: 'The automation script for the power station is stuck. You need to identify why the counter never stops.'
                      }
                    },
                    {
                      type: 'REQUIREMENTS',
                      title: 'Technical Specs',
                      order: 2,
                      content: {
                        objectives: [
                          'Add a conditional break',
                          'Ensure the loop runs exactly 10 times'
                        ]
                      }
                    },
                    {
                      type: 'CHALLENGE_EDITOR',
                      title: 'Code Editor',
                      order: 3,
                      content: {
                        starterCode: 'while True:\n    print("Pumping Power...")\n    # TODO: Add a way to stop the loop after 10 prints',
                        testCases: 'Output contains exactly 10 "Pumping Power..." messages'
                      }
                    },
                    {
                      type: 'FEEDBACK',
                      title: 'System Analysis',
                      order: 4,
                      content: {
                        successMessage: 'Great job! The village power is stable.'
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

  // 3. Creator Challenge: Optimization Task (Timed)
  const creatorChallenge = await prisma.course.create({
    data: {
      title: 'Creator Lab: Data Stream Optimization',
      description: 'Optimize the data packets to be 50% smaller. Time is of the essence.',
      type: 'CHALLENGE',
      tierRequired: 'CREATOR_ELITE',
      modules: {
        create: {
          title: 'Elite Algorithms',
          order: 1,
          lessons: {
            create: {
              title: 'Packet Squeezer',
              order: 1,
              phases: {
                createMany: {
                  data: [
                    {
                      type: 'SCENARIO',
                      title: 'Satellite Uplink Overload',
                      order: 1,
                      content: {
                        instructions: 'We are losing signal! You have 3 minutes to optimize the compression algorithm.'
                      }
                    },
                    {
                      type: 'CHALLENGE_EDITOR',
                      title: 'Optimization Workspace',
                      order: 2,
                      content: {
                        timeLimit: 180, // Seconds
                        starterCode: 'def compress(data):\n    # This is a naive compression, make it better!\n    return data',
                        minEfficiency: 0.5
                      }
                    },
                    {
                      type: 'FEEDBACK',
                      title: 'Performance Report',
                      order: 3,
                      content: {
                        metrics: ['Time remaining', 'Compression ratio']
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

  console.log('Challenges Seeded:');
  console.log('- Explorer:', explorerChallenge.title);
  console.log('- Builder:', builderChallenge.title);
  console.log('- Creator:', creatorChallenge.title);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
