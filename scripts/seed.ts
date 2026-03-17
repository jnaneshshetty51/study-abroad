import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create services
  const countrySelection = await prisma.service.upsert({
    where: { slug: 'country-selection' },
    update: {},
    create: {
      name: 'Country Selection',
      slug: 'country-selection',
      description: 'Expert guidance to choose the perfect country for your study abroad journey',
    },
  });

  const visaAssistance = await prisma.service.upsert({
    where: { slug: 'visa-assistance' },
    update: {},
    create: {
      name: 'Visa Assistance',
      slug: 'visa-assistance',
      description: 'Complete visa application support with high success rates',
    },
  });

  const admissionSupport = await prisma.service.upsert({
    where: { slug: 'admission-support' },
    update: {},
    create: {
      name: 'Admission Support',
      slug: 'admission-support',
      description: 'End-to-end admission support for top universities worldwide',
    },
  });

  console.log('Services created:', { countrySelection, visaAssistance, admissionSupport });

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@studyabroad.com' },
    update: {},
    create: {
      email: 'admin@studyabroad.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'ADMIN',
    },
  });

  console.log('Admin user created:', admin);

  // Create sample countries
  const usa = await prisma.country.upsert({
    where: { code: 'US' },
    update: {},
    create: {
      name: 'United States',
      code: 'US',
      description: 'Home to world-renowned universities and diverse study opportunities',
    },
  });

  const uk = await prisma.country.upsert({
    where: { code: 'GB' },
    update: {},
    create: {
      name: 'United Kingdom',
      code: 'GB',
      description: 'Rich academic tradition with prestigious universities',
    },
  });

  const canada = await prisma.country.upsert({
    where: { code: 'CA' },
    update: {},
    create: {
      name: 'Canada',
      code: 'CA',
      description: 'High-quality education and welcoming environment for international students',
    },
  });

  const australia = await prisma.country.upsert({
    where: { code: 'AU' },
    update: {},
    create: {
      name: 'Australia',
      code: 'AU',
      description: 'Excellent universities and beautiful study destinations',
    },
  });

  console.log('Countries created:', { usa, uk, canada, australia });

  // Create sample universities
  const harvard = await prisma.university.upsert({
    where: { id: 'harvard-1' },
    update: {},
    create: {
      id: 'harvard-1',
      name: 'Harvard University',
      countryId: usa.id,
      description: 'One of the most prestigious universities in the world',
      website: 'https://www.harvard.edu',
      commission: 15.0,
      ranking: 1,
    },
  });

  const mit = await prisma.university.upsert({
    where: { id: 'mit-1' },
    update: {},
    create: {
      id: 'mit-1',
      name: 'Massachusetts Institute of Technology',
      countryId: usa.id,
      description: 'Leading institution for science and technology',
      website: 'https://www.mit.edu',
      commission: 12.0,
      ranking: 2,
    },
  });

  const oxford = await prisma.university.upsert({
    where: { id: 'oxford-1' },
    update: {},
    create: {
      id: 'oxford-1',
      name: 'University of Oxford',
      countryId: uk.id,
      description: 'One of the oldest and most prestigious universities',
      website: 'https://www.ox.ac.uk',
      commission: 14.0,
      ranking: 3,
    },
  });

  console.log('Universities created:', { harvard, mit, oxford });

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

