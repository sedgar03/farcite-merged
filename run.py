import os
import subprocess
import time
import requests
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def run_backend():
    os.chdir('backend')
    port = '8080'
    host = '0.0.0.0'
    return subprocess.Popen(['uvicorn', 'main:app', '--host', host, '--port', port])

def wait_for_backend(timeout=30):
    start_time = time.time()
    while time.time() - start_time < timeout:
        try:
            url = 'http://localhost:8080/api/hello'
            logger.info(f"Attempting to connect to backend at: {url}")
            response = requests.get(url)
            if response.status_code == 200:
                logger.info("Backend is ready!")
                return True
        except requests.RequestException:
            pass
        time.sleep(1)
    logger.error("Backend failed to start within the timeout period.")
    return False

if __name__ == '__main__':
    logger.info("Starting backend...")
    backend_process = run_backend()
    
    logger.info("Waiting for backend to be ready...")
    if wait_for_backend():
        logger.info("Backend is ready. Frontend should be served separately.")
        try:
            backend_process.wait()
        except KeyboardInterrupt:
            logger.info("Stopping application...")
        finally:
            backend_process.terminate()
    else:
        logger.error("Failed to start the application.")
        backend_process.terminate()