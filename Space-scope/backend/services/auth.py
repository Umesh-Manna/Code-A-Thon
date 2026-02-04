from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from supabase_client import supabase
import bcrypt

router = APIRouter(prefix="/auth", tags=["Auth"])

class Signup(BaseModel):
    email: str
    password: str
    name: str

class Login(BaseModel):
    email: str
    password: str

@router.post("/signup")
def signup(user: Signup):
    existing = supabase.table("space_scope") \
        .select("id") \
        .eq("email", user.email) \
        .execute()

    if existing.data:
        raise HTTPException(status_code=400, detail="User already exists")

    # Hash password
    hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    supabase.table("space_scope").insert({
        "email": user.email,
        "password": hashed_password,
        "name": user.name
    }).execute()

    return {"message": "Signup successful"}

@router.post("/login")
def login(user: Login):
    result = supabase.table("space_scope") \
        .select("id,email,name,password") \
        .eq("email", user.email) \
        .execute()

    if not result.data:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    db_user = result.data[0]
    if not bcrypt.checkpw(user.password.encode('utf-8'), db_user["password"].encode('utf-8')):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # Remove password before returning
    db_user.pop("password")
    return {"message": "Login successful", "student": db_user}
