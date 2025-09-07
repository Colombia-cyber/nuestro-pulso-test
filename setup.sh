#!/bin/bash
# Automated setup for Vite + React + Firebase project

set -e

# Check for Node.js
if ! command -v node &> /dev/null; then
  echo "Node.js not found. Installing Node.js..."
  curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
  sudo apt-get install -y nodejs
else
  echo "Node.js is already installed."
fi

# Check for npm
if ! command -v npm &> /dev/null; then
  echo "npm not found! Please ensure npm is installed."
  exit 1
fi

# Install Firebase CLI
if ! command -v firebase &> /dev/null; then
  echo "Installing Firebase CLI globally..."
  npm install -g firebase-tools
else
  echo "Firebase CLI is already installed."
fi

# Install NPM dependencies
if [ -f package.json ]; then
  echo "Installing project dependencies..."
  npm install
else
  echo "No package.json found! Please check your repository."
fi

echo "Setup complete! You can now run bash dev.sh to start the dev server.
