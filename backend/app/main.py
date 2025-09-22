from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
from dotenv import load_dotenv
import os

# Import routes
from app.routes import auth, users, courses, hackathons, portfolio, analytics, ai

# Load environment variables
load_dotenv()

# Create FastAPI app
app = FastAPI(
    title="MedhasMind API",
    description="Backend API for MedhasMind - AI-powered hackathon preparation platform",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "*"],  # Update with your frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error", "error": str(exc)}
    )

# Include routers
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(users.router, prefix="/api/v1/users", tags=["Users"])
app.include_router(courses.router, prefix="/api/v1/courses", tags=["Courses"])
app.include_router(hackathons.router, prefix="/api/v1/hackathons", tags=["Hackathons"])
app.include_router(portfolio.router, prefix="/api/v1/portfolio", tags=["Portfolio"])
app.include_router(analytics.router, prefix="/api/v1/analytics", tags=["Analytics"])
app.include_router(ai.router, prefix="/api/v1/ai", tags=["AI Services"])

# Root endpoint
@app.get("/")
async def root():
    return {"message": "Welcome to MedhasMind API", "version": "1.0.0"}

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "medhasmind-api"}

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("app.main:app", host="0.0.0.0", port=port, reload=True)