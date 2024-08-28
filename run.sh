#!/bin/bash

# Start the backend
cd backend
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8080 &

# Build and start the frontend
cd ../frontend
npm install
npm run build
npx serve -s build -l 3000


