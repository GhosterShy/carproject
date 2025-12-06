from fastapi import FastAPI
from routes import user_routes,cars_routes,booking_routes
from fastapi.middleware.cors import CORSMiddleware
from routes import auth_routes


app = FastAPI(title="User API (Motor + FastAPI)")

app.include_router(user_routes.router)
app.include_router(auth_routes.router)
app.include_router(cars_routes.router)
app.include_router(booking_routes.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
