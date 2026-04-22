# nginx — Production Reverse Proxy

This folder contains the Nginx configuration used in the production Docker Compose stack.

## What it does

Nginx sits in front of the entire application and handles:

| Responsibility | Detail |
|----------------|--------|
| **Static files** | Serves the pre-built React app from `chatty/build/` |
| **API proxy** | Forwards `/api/*` requests to the Node.js backend container |
| **Socket.IO** | Proxies WebSocket upgrade requests to the backend |
| **HTTPS** | Terminates SSL using certs mounted from `nginx/ssl/` |
| **Redirects** | HTTP → HTTPS, `www.codeandtest.com` → `codeandtest.com` (301) |
| **Security headers** | HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy |
| **Rate limiting** | 30 req/s on `/api/`, 5 req/min on `/api/v1/signin` and `/api/v1/signup` |

## Folder structure

```
nginx/
  nginx.conf      # Main Nginx config (mounted read-only into the container)
  ssl/            # SSL certificate files (NOT committed — add manually)
    fullchain.pem
    privkey.pem
```

## SSL certificates

The `ssl/` directory is intentionally empty in the repo. Before running in production, add your certificates:

```bash
# Using Let's Encrypt / Certbot
certbot certonly --standalone -d codeandtest.com -d www.codeandtest.com

# Then copy the certs
cp /etc/letsencrypt/live/codeandtest.com/fullchain.pem nginx/ssl/
cp /etc/letsencrypt/live/codeandtest.com/privkey.pem  nginx/ssl/
```

Or place your own certificates directly in `nginx/ssl/`.

## How it fits into docker-compose

```
docker-compose.yml (theProject root)
│
├── nginx        ← this folder, mounted into the nginx container
├── chatty/build ← React production build, served as static files
└── chatty-backend ← Node.js API, proxied via /api/
```

The `docker-compose.yml` mounts this folder into the nginx container:

```yaml
volumes:
  - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
  - ./nginx/ssl:/etc/nginx/ssl:ro
  - ./chatty/build:/usr/share/nginx/html:ro
```

## Running in production

```bash
# 1. Build the React frontend
cd chatty && npm run build

# 2. Add SSL certs to nginx/ssl/ (see above)

# 3. Start the full stack
cd ..  # back to theProject root
docker compose up -d

# 4. Check nginx is serving correctly
curl -I https://codeandtest.com
```

## Modifying nginx.conf

After editing `nginx.conf`, reload nginx without downtime:

```bash
docker compose exec nginx nginx -s reload
```

To test the config before reloading:

```bash
docker compose exec nginx nginx -t
```
