import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import requests, accounts, venues, reviews
from authenticator import authenticator

app = FastAPI()

origins = [
    "http://localhost:3000",
    os.environ.get("CORS_HOST", None)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(venues.router)
app.include_router(authenticator.router)
app.include_router(accounts.router)
app.include_router(requests.router)
app.include_router(reviews.router)
