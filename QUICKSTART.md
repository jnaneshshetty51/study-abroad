# Quick Start Guide

Get your Study Abroad Consultancy website up and running in minutes!

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database running
- MinIO server running (or use Docker)

## Quick Setup (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Copy `.env.example` to `.env` and update with your values:
```bash
# Create .env file
cat > .env << EOF
DATABASE_URL="postgresql://user:password@localhost:5432/study_abroad?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-random-secret-key-here"
MINIO_ENDPOINT="localhost"
MINIO_PORT=9000
MINIO_ACCESS_KEY="minioadmin"
MINIO_SECRET_KEY="minioadmin"
MINIO_BUCKET="study-abroad-documents"
MINIO_USE_SSL=false
NODE_ENV="development"
EOF
```

### 3. Set Up Database
```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push
```

### 4. Seed Initial Data (Optional)
```bash
npm run db:seed
```

This creates:
- Admin user: `admin@studyabroad.com` / `admin123`
- Three services (Country Selection, Visa Assistance, Admission Support)
- Sample countries (USA, UK, Canada, Australia)
- Sample universities

### 5. Start Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Using Docker for MinIO (Easiest)

If you don't have MinIO installed, use Docker:

```bash
docker run -d \
  -p 9000:9000 \
  -p 9001:9001 \
  --name minio \
  -e "MINIO_ROOT_USER=minioadmin" \
  -e "MINIO_ROOT_PASSWORD=minioadmin" \
  minio/minio server /data --console-address ":9001"
```

Access MinIO Console at: http://localhost:9001

## First Steps After Setup

1. **Login as Admin**:
   - Go to `/login`
   - Email: `admin@studyabroad.com`
   - Password: `admin123`

2. **Access Admin Panel**:
   - Navigate to `/admin`
   - Manage universities, countries, and inquiries

3. **Add Universities**:
   - Go to `/admin/universities`
   - Click "Add University"
   - Fill in details including commission percentage

4. **Test Inquiry Form**:
   - Visit any service page (e.g., `/services/country-selection`)
   - Submit a test inquiry
   - View it in `/admin/inquiries`

## Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server

# Database
npm run db:generate      # Generate Prisma Client
npm run db:push          # Push schema changes
npm run db:migrate       # Create migration
npm run db:studio        # Open Prisma Studio
npm run db:seed          # Seed database

# Code Quality
npm run lint             # Run ESLint
```

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running: `sudo systemctl status postgresql`
- Check DATABASE_URL in `.env` is correct
- Verify database exists: `psql -U postgres -l`

### MinIO Connection Issues
- Ensure MinIO is running: `docker ps` (if using Docker)
- Check MINIO_ENDPOINT and MINIO_PORT in `.env`
- Verify credentials match MinIO setup

### Port Already in Use
- Change port: `PORT=3001 npm run dev`
- Or kill process using port 3000

## Next Steps

- Read [README.md](./README.md) for detailed documentation
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment
- Customize the UI and branding
- Add more universities and countries
- Configure email notifications (optional)

## Support

For issues:
1. Check application logs
2. Verify all services are running
3. Review environment variables
4. Check database migrations

Happy coding! 🚀

