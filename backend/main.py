from fastapi import FastAPI, HTTPException, Body, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/hello")
async def read_root():
    logger.info("Received request at /api/hello")
    return JSONResponse(content={"message": "Hello from FastAPI!"})

@app.post("/api/send_message")
async def send_message(message: str = Body(..., embed=True)):
    return JSONResponse(content={"received_message": message})

logger.info("FastAPI application initialized")