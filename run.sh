#!/bin/bash

# Start the backend
cd backend
pip install -r requirements.txt
uvicorn main:app --host 127.0.0.1 --port 8080 &

# Wait for the backend to start
sleep 5

# Build and start the frontend
cd ../frontend
npm install
npm run build
npx serve -s build -l 3000


