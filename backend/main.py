from fastapi import FastAPI, HTTPException, Body, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    message: str

@app.get("/")
async def read_root():
    return {"message": "Welcome to the API"}

@app.get("/api/hello")
async def read_hello():
    logger.info("Received request at /api/hello")
    return JSONResponse(content={"message": "Hello from FastAPI!"})

@app.post("/api/send_message")
async def send_message(request: Request):
    try:
        body = await request.json()
        message = body.get('message', '')
        logger.info(f"Received message: {message}")
        processed_message = ' '.join(message)
        logger.info(f"Processed message: {processed_message}")
        return JSONResponse(content={"received_message": processed_message})
    except Exception as e:
        logger.error(f"Error processing message: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/chat")
async def chat(message: str = Body(..., embed=True)):
    logger.info(f"Received chat message: {message}")
    processed_message = ' '.join(message)
    return JSONResponse(content={"response": processed_message})

@app.post("/api/process_message")
async def process_message(message: Message):
    logger.info(f"Received message: {message.message}")
    processed_message = " ".join(message.message)
    logger.info(f"Processed message: {processed_message}")
    return {"processed_message": processed_message}

@app.get("/api/health")
async def health_check():
    logger.info("Health check endpoint called")
    return {"status": "ok"}

logger.info("FastAPI application initialized")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)