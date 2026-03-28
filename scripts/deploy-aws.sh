#!/bin/bash
# =============================================================================
# deploy-aws.sh — Full AWS EC2 setup from scratch
#
# Prerequisites:
#   - Fresh Ubuntu 22.04/24.04 EC2 instance (t3.medium recommended)
#   - SSH access: ssh -i ~/.ssh/chatty-key.pem ubuntu@YOUR_EC2_IP
#   - Security group ports open: 22, 80, 443, 5000
#   - .env.production file ready to copy to the server
#
# Usage (run on the EC2 server):
#   sudo bash scripts/deploy-aws.sh
# =============================================================================
set -e

# ── 1. Install Docker ─────────────────────────────────────────────────────────
echo "==> Installing Docker..."
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker ubuntu
newgrp docker

# Verify
docker --version

# ── 2. Clone repos ────────────────────────────────────────────────────────────
echo "==> Cloning repositories..."
cd /opt
sudo git clone https://github.com/michael120288/chatty-backend.git
sudo git clone https://github.com/michael120288/chatFlow.git

# The sandbox Dockerfile expects the frontend repo at path ./chatty
sudo mv chatFlow chatty

# ── 3. Build sandbox image ────────────────────────────────────────────────────
# This image runs user-submitted code (Playwright, Cypress, Jest)
# Takes 3-5 minutes on first build
echo "==> Building sandbox image..."
cd /opt
sudo docker build \
  -f chatty-backend/sandbox/Dockerfile \
  -t test-quest-sandbox:latest \
  .

# ── 4. Copy .env.production ───────────────────────────────────────────────────
# Run this from your LOCAL machine (not the server):
#   scp -i ~/.ssh/chatty-key.pem .env.production ubuntu@YOUR_EC2_IP:/opt/chatty-backend/
echo "==> Make sure .env.production is in /opt/chatty-backend/ before next step"

# ── 5. Start the backend ──────────────────────────────────────────────────────
echo "==> Starting backend with docker compose..."
cd /opt/chatty-backend
sudo docker compose up -d --build

# ── 6. Verify ─────────────────────────────────────────────────────────────────
echo ""
echo "==> Checking containers..."
docker ps

echo ""
echo "==> Done! Backend should be running on http://YOUR_EC2_IP:5000"
echo ""
echo "Next steps:"
echo "  1. Update DNS: point api.codeandtest.com -> YOUR_EC2_IP"
echo "  2. (Optional) Set up Nginx + SSL with Let's Encrypt"
echo "  3. Update REACT_APP_API_URL in Vercel to https://api.codeandtest.com"
