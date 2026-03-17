# Deployment Guide for Hostinger VPS

This guide will help you deploy the Study Abroad Consultancy website on a Hostinger VPS.

## Step 1: Initial VPS Setup

### Connect to your VPS
```bash
ssh root@your-vps-ip
```

### Update system packages
```bash
apt update && apt upgrade -y
```

## Step 2: Install Required Software

### Install Node.js 18.x
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs
node --version  # Verify installation
```

### Install PostgreSQL
```bash
apt install postgresql postgresql-contrib -y
systemctl start postgresql
systemctl enable postgresql
```

### Create PostgreSQL database and user
```bash
sudo -u postgres psql
```

In PostgreSQL prompt:
```sql
CREATE DATABASE study_abroad;
CREATE USER study_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE study_abroad TO study_user;
\q
```

### Install MinIO
```bash
wget https://dl.min.io/server/minio/release/linux-amd64/minio
chmod +x minio
mv minio /usr/local/bin/

# Create data directory
mkdir -p /data/minio
chown $USER:$USER /data/minio
```

### Create MinIO systemd service
```bash
nano /etc/systemd/system/minio.service
```

Add:
```ini
[Unit]
Description=MinIO Object Storage
After=network.target

[Service]
Type=simple
User=root
ExecStart=/usr/local/bin/minio server /data/minio --console-address ":9001"
Restart=always
Environment="MINIO_ROOT_USER=minioadmin"
Environment="MINIO_ROOT_PASSWORD=your_minio_password"

[Install]
WantedBy=multi-user.target
```

Start MinIO:
```bash
systemctl daemon-reload
systemctl start minio
systemctl enable minio
```

Access MinIO Console at: `http://your-vps-ip:9001`

## Step 3: Deploy Application

### Clone repository
```bash
cd /var/www
git clone <your-repo-url> study-abroad
cd study-abroad
```

### Install dependencies
```bash
npm install
```

### Set up environment variables
```bash
nano .env
```

Add:
```env
DATABASE_URL="postgresql://study_user:your_secure_password@localhost:5432/study_abroad?schema=public"
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="generate-a-random-secret-key-here"
MINIO_ENDPOINT="localhost"
MINIO_PORT=9000
MINIO_ACCESS_KEY="minioadmin"
MINIO_SECRET_KEY="your_minio_password"
MINIO_BUCKET="study-abroad-documents"
MINIO_USE_SSL=false
NODE_ENV="production"
```

### Generate Prisma Client and run migrations
```bash
npm run db:generate
npm run db:push
```

### Build application
```bash
npm run build
```

## Step 4: Set up Process Manager (PM2)

### Install PM2
```bash
npm install -g pm2
```

### Start application with PM2
```bash
pm2 start npm --name "study-abroad" -- start
pm2 save
pm2 startup
```

### Useful PM2 commands
```bash
pm2 list          # List all processes
pm2 logs study-abroad  # View logs
pm2 restart study-abroad  # Restart app
pm2 stop study-abroad  # Stop app
```

## Step 5: Configure Nginx Reverse Proxy

### Install Nginx
```bash
apt install nginx -y
```

### Create Nginx configuration
```bash
nano /etc/nginx/sites-available/study-abroad
```

Add:
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Enable site
```bash
ln -s /etc/nginx/sites-available/study-abroad /etc/nginx/sites-enabled/
nginx -t  # Test configuration
systemctl restart nginx
```

## Step 6: Set up SSL Certificate

### Install Certbot
```bash
apt install certbot python3-certbot-nginx -y
```

### Obtain SSL certificate
```bash
certbot --nginx -d your-domain.com -d www.your-domain.com
```

Follow the prompts. Certbot will automatically configure Nginx.

### Auto-renewal (already set up by certbot)
```bash
certbot renew --dry-run  # Test renewal
```

## Step 7: Firewall Configuration

### Configure UFW firewall
```bash
ufw allow 22/tcp   # SSH
ufw allow 80/tcp   # HTTP
ufw allow 443/tcp  # HTTPS
ufw enable
```

## Step 8: Initial Setup

### Create admin user
You can create an admin user through the registration page and then update the role in the database:

```bash
sudo -u postgres psql -d study_abroad
```

```sql
UPDATE "User" SET role = 'ADMIN' WHERE email = 'admin@example.com';
```

### Create initial services
Access the admin panel at `/admin` and create the services:
- Country Selection
- Visa Assistance
- Admission Support

## Step 9: Monitoring and Maintenance

### Set up log rotation
```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

### Monitor application
```bash
pm2 monit
```

### Update application
```bash
cd /var/www/study-abroad
git pull
npm install
npm run db:generate
npm run build
pm2 restart study-abroad
```

## Troubleshooting

### Check application logs
```bash
pm2 logs study-abroad
```

### Check Nginx logs
```bash
tail -f /var/log/nginx/error.log
```

### Check PostgreSQL status
```bash
systemctl status postgresql
```

### Check MinIO status
```bash
systemctl status minio
```

### Restart services
```bash
systemctl restart postgresql
systemctl restart minio
pm2 restart study-abroad
systemctl restart nginx
```

## Security Checklist

- [ ] Changed default database password
- [ ] Changed MinIO root credentials
- [ ] Set strong NEXTAUTH_SECRET
- [ ] Configured firewall (UFW)
- [ ] SSL certificate installed
- [ ] Regular backups configured
- [ ] Updated system packages
- [ ] Changed SSH port (optional but recommended)

## Backup Strategy

### Database backup
```bash
# Create backup script
nano /root/backup-db.sh
```

Add:
```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/root/backups"
mkdir -p $BACKUP_DIR
pg_dump -U study_user study_abroad > $BACKUP_DIR/db_backup_$DATE.sql
find $BACKUP_DIR -name "db_backup_*.sql" -mtime +7 -delete
```

Make executable and add to crontab:
```bash
chmod +x /root/backup-db.sh
crontab -e
# Add: 0 2 * * * /root/backup-db.sh
```

## Support

For issues or questions, check:
- Application logs: `pm2 logs study-abroad`
- Nginx logs: `/var/log/nginx/`
- System logs: `journalctl -u minio` or `journalctl -u postgresql`

