import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

async function main() {
  await prisma.registration.deleteMany();
  await prisma.event.deleteMany();

  const events = [
    {
      name: 'Hack the Future',
      description: 'A 24-hour hackathon focusing on AI and sustainability. Join us to build innovative solutions for a better tomorrow.',
      category: 'Hackathon',
      venue: 'Main Campus Gym',
      startsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      endsAt: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
      isFeatured: true,
      capacity: 200,
    },
    {
      name: 'Intro to React & Vite',
      description: 'Learn the basics of modern frontend development with React and Vite in this hands-on workshop.',
      category: 'Workshop',
      venue: 'Lab 402',
      startsAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      endsAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000), // +3 hours
      isFeatured: false,
      capacity: 50,
    },
    {
      name: 'Alumni Tech Talk: Working at FAANG',
      description: 'Hear from our alumni working at top tech companies about their journey, interview tips, and what it takes to succeed.',
      category: 'Talk',
      venue: 'Auditorium B',
      startsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      endsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
      isFeatured: false,
      capacity: 150,
    },
    {
      name: 'Competitive Programming Contest',
      description: 'Test your algorithmic skills against the best in the college. Prizes for top 3!',
      category: 'Contest',
      venue: 'Virtual',
      startsAt: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
      endsAt: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000),
      isFeatured: false,
    },
    {
      name: 'End of Semester Mixer',
      description: 'Relax and unwind with pizza, drinks, and networking with fellow club members.',
      category: 'Social',
      venue: 'Student Union Hub',
      startsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      endsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000),
      isFeatured: false,
      capacity: 100,
    },
    {
      name: 'Git & GitHub Basics',
      description: 'Master version control! Essential for every developer.',
      category: 'Workshop',
      venue: 'Lab 401',
      startsAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago (past)
      endsAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
      isFeatured: false,
      capacity: 40,
    },
    {
      name: 'UI/UX Design for Developers',
      description: 'Learn how to make your apps look professional with basic design principles.',
      category: 'Talk',
      venue: 'Room 205',
      startsAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      endsAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000 + 1 * 60 * 60 * 1000),
      isFeatured: false,
      capacity: 60,
    },
    {
      name: 'Open Source Sprint',
      description: 'Contribute to real open source projects with mentorship from senior members.',
      category: 'Hackathon',
      venue: 'Library Tech Center',
      startsAt: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
      endsAt: new Date(Date.now() + 26 * 24 * 60 * 60 * 1000),
      isFeatured: false,
      capacity: 80,
    }
  ];

  for (const e of events) {
    await prisma.event.create({ data: e });
  }

  console.log('Seeded database with events.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
