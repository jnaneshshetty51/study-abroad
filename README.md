# Study Abroad Consultancy Website

A comprehensive Next.js application for managing study abroad consultancy services with features for country selection, visa assistance, and admission support.

## Features

- **Country Selection Service**: Expert guidance for choosing study destinations
- **Visa Assistance**: Complete visa application support
- **Admission Support**: End-to-end university admission assistance
- **University Management**: Admin panel for managing partner universities with commission tracking
- **Inquiry Management**: Customer inquiry tracking and management system
- **File Storage**: MinIO integration for document storage
- **Authentication**: Secure user authentication and authorization

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Storage**: MinIO (S3-compatible object storage)
- **Styling**: Tailwind CSS
- **Authentication**: JWT-based authentication

## Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL database
- MinIO server (or S3-compatible storage)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd study-abroad
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/study_abroad?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-change-in-production"

# MinIO
MINIO_ENDPOINT="localhost"
MINIO_PORT=9000
MINIO_ACCESS_KEY="minioadmin"
MINIO_SECRET_KEY="minioadmin"
MINIO_BUCKET="study-abroad-documents"
MINIO_USE_SSL=false

# App
NODE_ENV="development"
```

4. Set up the database:
```bash
# Generate Prisma Client
npm run db:generate

# Run migrations
npm run db:migrate

# Or push schema directly (for development)
npm run db:push
```

5. Initialize MinIO bucket:
The bucket will be created automatically on first file upload, or you can create it manually using MinIO console.

6. Seed initial data (optional):
You may want to create an admin user and initial services. You can do this through the admin panel after first login.

7. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment on Hostinger VPS

### Prerequisites on VPS

1. **Install Node.js and npm**:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

2. **Install PostgreSQL**:
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

3. **Install MinIO**:
```bash
wget https://dl.min.io/server/minio/release/linux-amd64/minio
chmod +x minio
sudo mv minio /usr/local/bin/
```

4. **Set up PostgreSQL database**:
```bash
sudo -u postgres psql
CREATE DATABASE study_abroad;
CREATE USER study_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE study_abroad TO study_user;
\q
```

5. **Set up MinIO**:
```bash
# Create MinIO data directory
sudo mkdir -p /data/minio
sudo chown $USER:$USER /data/minio

# Create systemd service for MinIO
sudo nano /etc/systemd/system/minio.service
```

Add the following content:
```ini
[Unit]
Description=MinIO
After=network.target

[Service]
Type=simple
User=your_username
ExecStart=/usr/local/bin/minio server /data/minio --console-address ":9001"
Restart=always

[Install]
WantedBy=multi-user.target
```

Start MinIO:
```bash
sudo systemctl start minio
sudo systemctl enable minio
```

### Deploy Application

1. **Clone repository on VPS**:
```bash
cd /var/www
git clone <repository-url> study-abroad
cd study-abroad
```

2. **Install dependencies**:
```bash
npm install
```

3. **Build the application**:
```bash
npm run build
```

4. **Set up environment variables**:
```bash
nano .env
# Add your production environment variables
```

5. **Set up PM2** (Process Manager):
```bash
npm install -g pm2
pm2 start npm --name "study-abroad" -- start
pm2 save
pm2 startup
```

6. **Set up Nginx reverse proxy**:
```bash
sudo apt install nginx
sudo nano /etc/nginx/sites-available/study-abroad
```

Add configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/study-abroad /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

7. **Set up SSL with Let's Encrypt**:
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## Database Schema

The application uses Prisma with the following main models:
- **User**: User accounts (CLIENT/ADMIN roles)
- **Country**: Available study destinations
- **University**: Partner universities with commission rates
- **Program**: University programs/degrees
- **Service**: Available consultancy services
- **Inquiry**: Customer inquiries
- **Application**: Student applications
- **VisaInfo**: Visa information by country

## Admin Panel

Access the admin panel at `/admin` (requires ADMIN role). Features include:
- Manage universities and commission rates
- Manage countries
- View and update inquiry statuses
- User management

## API Routes

- `/api/auth/*` - Authentication endpoints
- `/api/universities` - University management
- `/api/countries` - Country management
- `/api/inquiries` - Inquiry management
- `/api/upload` - File upload to MinIO

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:studio` - Open Prisma Studio
- `npm run db:migrate` - Run database migrations

## Security Notes

- Change `NEXTAUTH_SECRET` in production
- Use strong database passwords
- Configure MinIO access keys securely
- Enable SSL/TLS in production
- Regularly update dependencies

## License

MIT

