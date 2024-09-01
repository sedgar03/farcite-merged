#!/bin/bash

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
pip install -r requirements.txt
cd ..

# Install and build frontend
echo "Installing frontend dependencies and building..."
cd frontend
npm install
npm run build
cd ..

echo "Build process completed."