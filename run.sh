#!/bin/bash

# Function to start the backend
start_backend() {
    cd backend
    pip install -r requirements.txt
    uvicorn main:app --host 0.0.0.0 --port 8080 &
    BACKEND_PID=$!
    cd ..
    echo "Backend started with PID $BACKEND_PID"
}

# Function to start the frontend
start_frontend() {
    cd frontend
    npm install
    npm run build
    npx serve -s build -l 3000 &
    FRONTEND_PID=$!
    cd ..
    echo "Frontend started with PID $FRONTEND_PID"
}

# Start both services
start_frontend
sleep 300
start_backend


# Keep the script running
echo "Both services started. Press Ctrl+C to exit."
wait