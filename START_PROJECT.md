# How to Start the Chatty Backend Project

## Prerequisites

Before starting the project, ensure you have the following installed and running:

1. **Node.js** (v16 or higher)
2. **MongoDB** (local or remote connection)
3. **Redis** (local or remote connection)
4. **npm** or **yarn**

---

## Step 1: Install Dependencies

```bash
npm install
```

---

## Step 2: Create and Configure .env File

**IMPORTANT**: You need to create a `.env` file with proper credentials.

```bash
# Copy the example file
cp .env.example .env

# Edit the .env file with your credentials
nano .env  # or use your preferred editor
```

### Required Environment Variables:

```bash
# Generate strong secrets first:
openssl rand -base64 32  # For JWT_TOKEN
openssl rand -base64 32  # For SECRET_KEY_ONE
openssl rand -base64 32  # For SECRET_KEY_TWO
```

### Minimum .env Configuration:

```env
# Database
DATABASE_URL=mongodb://localhost:27017/chattyapp-backend

# JWT & Secrets (MUST be 32+ characters)
JWT_TOKEN=your-generated-jwt-token-min-32-chars-here
SECRET_KEY_ONE=your-generated-secret-key-one-min-32-chars
SECRET_KEY_TWO=your-generated-secret-key-two-min-32-chars

# Environment
NODE_ENV=development

# URLs
CLIENT_URL=http://localhost:3000
API_URL=http://localhost:5000/api/v1

# Redis
REDIS_HOST=redis://localhost:6379

# Cloudinary (for image uploads)
CLOUD_NAME=your-cloudinary-cloud-name
CLOUD_API_KEY=your-cloudinary-api-key
CLOUD_API_SECRET=your-cloudinary-api-secret

# Email (development - use Ethereal Email: https://ethereal.email/)
SENDER_EMAIL=your-test-email@ethereal.email
SENDER_EMAIL_PASSWORD=your-ethereal-password

# SendGrid (optional for development)
SENDGRID_API_KEY=
SENDGRID_SENDER=

# AWS (optional)
EC2_URL=http://169.254.169.254/latest/meta-data/instance-id
```

---

## Step 3: Start MongoDB

### Option A: Local MongoDB
```bash
# macOS (with Homebrew)
brew services start mongodb-community

# Linux (systemd)
sudo systemctl start mongod

# Or run manually
mongod --dbpath /path/to/data/directory
```

### Option B: MongoDB Atlas (Cloud)
- Use the connection string from MongoDB Atlas in your `DATABASE_URL`

---

## Step 4: Start Redis

### Option A: Local Redis
```bash
# macOS (with Homebrew)
brew services start redis

# Linux (systemd)
sudo systemctl start redis

# Or run manually
redis-server
```

### Option B: Redis Cloud
- Use the connection string from Redis Cloud in your `REDIS_HOST`

---

## Step 5: Start the Development Server

### Option 1: Development Mode (Recommended for Development)

```bash
npm run dev
```

This command:
- Uses `nodemon` for auto-restart on file changes
- Runs TypeScript directly (no build needed)
- Uses `tsconfig-paths` for path aliases
- Pipes output through `bunyan` for pretty logs

**Default Port**: 5000
**Access**: http://localhost:5000

---

### Option 2: Production Mode (PM2 with Build)

First, build the project:
```bash
npm run build
```

Then start with PM2:
```bash
npm start
```

This command:
- Builds the TypeScript code
- Runs with PM2 in cluster mode (5 instances)
- Auto-restarts on crashes
- Production environment

---

### Option 3: Simple Build Mode

```bash
npm run build
npm run start1
```

This command:
- Builds the project first
- Uses `nodemon` to watch the built files
- Good for testing the built version

---

## Step 6: (Optional) Seed the Database

If you want to populate the database with test data:

```bash
# Development
npm run seeds:dev

# Production (after build)
npm run seeds:prod
```

---

## Available npm Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with nodemon + TypeScript |
| `npm start` | Start production server with PM2 (requires build) |
| `npm run start1` | Start built server with nodemon |
| `npm run build` | Build TypeScript to JavaScript |
| `npm test` | Run tests with coverage |
| `npm run eslint:check` | Check code for linting issues |
| `npm run eslint:fix` | Fix linting issues automatically |
| `npm run prettier:check` | Check code formatting |
| `npm run prettier:fix` | Fix code formatting |
| `npm run seeds:dev` | Seed database (development) |
| `npm run seeds:prod` | Seed database (production) |
| `npm run stop` | Stop all PM2 processes |
| `npm run delete` | Delete all PM2 processes |

---

## Verify the Server is Running

### Check Health Endpoint
```bash
curl http://localhost:5000/health
```

Expected response:
```
Health: Server instance is healthy with process id XXXX on [date]
```

### Check API Base Path
```bash
curl http://localhost:5000/api/v1/
```

---

## Common Issues and Solutions

### Issue 1: "Configuration validation error: JWT_TOKEN must be at least 32 characters"
**Solution**: Generate a strong JWT token:
```bash
openssl rand -base64 32
```
Copy the output to your `.env` file as `JWT_TOKEN`

### Issue 2: "MongoDB connection failed"
**Solution**:
- Ensure MongoDB is running: `brew services list` (macOS)
- Check your `DATABASE_URL` in `.env`
- Test connection: `mongosh "mongodb://localhost:27017/chattyapp-backend"`

### Issue 3: "Redis connection error"
**Solution**:
- Ensure Redis is running: `redis-cli ping` (should return "PONG")
- Check your `REDIS_HOST` in `.env`
- Start Redis: `brew services start redis` (macOS)

### Issue 4: Port 5000 already in use
**Solution**: Change the port in `src/setupServer.ts` or kill the process:
```bash
# Find process on port 5000
lsof -ti:5000

# Kill the process
kill -9 $(lsof -ti:5000)
```

### Issue 5: "Cannot find module" errors
**Solution**: Rebuild the project:
```bash
rm -rf node_modules build
npm install
npm run build
```

---

## Quick Start (TL;DR)

For the fastest development setup:

```bash
# 1. Install dependencies
npm install

# 2. Create .env file (and add your credentials)
cp .env.example .env

# 3. Generate secrets
echo "JWT_TOKEN=$(openssl rand -base64 32)" >> .env
echo "SECRET_KEY_ONE=$(openssl rand -base64 32)" >> .env
echo "SECRET_KEY_TWO=$(openssl rand -base64 32)" >> .env

# 4. Start MongoDB and Redis
brew services start mongodb-community
brew services start redis

# 5. Start the dev server
npm run dev
```

---

## API Endpoints

Once running, the following endpoints are available:

### Public Endpoints
- `GET /health` - Health check

### Protected Endpoints (require authentication)
- `GET /env` - Environment info
- `GET /instance` - Instance info
- `GET /fibo/:num` - Fibonacci calculator
- `GET /queues` - Queue dashboard

### Auth Endpoints
- `POST /api/v1/signup` - User registration
- `POST /api/v1/signin` - User login
- `GET /api/v1/signout` - User logout
- `GET /api/v1/currentuser` - Get current user

### Other Features (all require auth)
- Posts: `/api/v1/posts/*`
- Comments: `/api/v1/comments/*`
- Reactions: `/api/v1/reactions/*`
- Followers: `/api/v1/followers/*`
- Notifications: `/api/v1/notifications/*`
- Images: `/api/v1/images/*`
- Chat: `/api/v1/chat/*`
- Users: `/api/v1/users/*`

---

## Development Tips

1. **Auto-restart**: Use `npm run dev` - nodemon will restart on file changes
2. **Logs**: Output is piped through bunyan for pretty, structured logs
3. **Debugging**: Use `log.debug()` statements (they'll show in dev mode)
4. **Testing**: Run `npm test` before committing changes
5. **Linting**: Run `npm run eslint:fix` to auto-fix code style issues

---

## Production Deployment

For production deployment:

1. Build the project:
   ```bash
   npm run build
   ```

2. Set environment variables on your hosting platform

3. Start with PM2:
   ```bash
   NODE_ENV=production pm2 start ./build/src/app.js -i max
   ```

4. Setup PM2 to start on system boot:
   ```bash
   pm2 startup
   pm2 save
   ```

---

**Need Help?** Check the logs:
```bash
# Development (with bunyan)
npm run dev

# PM2 logs
pm2 logs

# PM2 monitoring
pm2 monit
```
