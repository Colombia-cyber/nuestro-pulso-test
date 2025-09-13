#!/bin/bash
# Automated setup for Nuestro Pulso - Vite + React + Firebase project

set -e

echo "🇨🇴 Setting up Nuestro Pulso - Red Cívica de Colombia"
echo "=================================================="

# Check for Node.js
if ! command -v node &> /dev/null; then
  echo "📦 Node.js not found. Installing Node.js 18..."
  curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
  sudo apt-get install -y nodejs
else
  echo "✅ Node.js is already installed ($(node --version))"
fi

# Check for npm
if ! command -v npm &> /dev/null; then
  echo "❌ npm not found! Please ensure npm is installed."
  exit 1
else
  echo "✅ npm is available ($(npm --version))"
fi

# Install Firebase CLI (optional for development)
if ! command -v firebase &> /dev/null; then
  echo "🔥 Installing Firebase CLI globally (this may take several minutes)..."
  npm install -g firebase-tools
else
  echo "✅ Firebase CLI is already installed."
fi

# Install NPM dependencies
if [ -f package.json ]; then
  echo "📦 Installing project dependencies..."
  npm install
  echo "✅ Dependencies installed successfully!"
else
  echo "❌ No package.json found! Please check your repository."
  exit 1
fi

# Copy environment file if it doesn't exist
if [ ! -f .env ] && [ -f .env.example ]; then
  echo "📝 Creating .env file from example..."
  cp .env.example .env
  echo "⚠️  Please edit .env file with your Firebase and News API credentials"
fi

echo ""
echo "🎉 Setup complete!"
echo "=============================="
echo "Next steps:"
echo "1. Edit .env file with your API credentials"
echo "2. Run 'bash dev.sh' or 'npm run dev' to start development server"
echo "3. Run 'npm run build' to build for production"
echo ""
echo "🌐 Development server will be available at http://localhost:5173"
