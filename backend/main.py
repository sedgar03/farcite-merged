from fastapi import FastAPI, HTTPException, Body, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import logging

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class Message(BaseModel):
    message: str

@app.get("/")
async def read_root():
    return {"message": "Welcome to the API"}

@app.get("/api/hello")
async def read_hello():
    logger.info("Received request at /api/hello")
    return JSONResponse(content={"message": "Hello from FastAPI!"})

@app.post("/api/process_message")
async def process_message(message: Message):
    logger.info(f"Received message: {message.message}")
    processed_message = message.message.upper()  # Simple processing: convert to uppercase
    logger.info(f"Processed message: {processed_message}")
    return {"processed_message": processed_message}

@app.get("/api/health")
async def health_check():
    logger.info("Health check endpoint called")
    return {"status": "ok"}

logger.info("FastAPI application initialized")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080, ssl_keyfile="key.pem", ssl_certfile="cert.pem")