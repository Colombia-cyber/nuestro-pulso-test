#!/bin/bash
# Start the development server for Nuestro Pulso - Red Cívica de Colombia

echo "🇨🇴 Starting Nuestro Pulso development server..."
echo "============================================="

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
  echo "📦 Dependencies not found. Running setup first..."
  bash setup.sh
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
  echo "⚠️  .env file not found. The app will use default Firebase configuration."
  echo "   To use your own Firebase project, copy .env.example to .env and configure it."
fi

echo "🚀 Starting Vite development server..."
npm run dev
