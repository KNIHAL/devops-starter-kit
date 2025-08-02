import os
import requests
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

def save_feedback(name: str, message: str):
    url = f"{SUPABASE_URL}/rest/v1/feedback"
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
    }
    payload = {"name": name, "message": message}
    response = requests.post(url, json=payload, headers=headers)
    response.raise_for_status()

def get_all_feedback():
    url = f"{SUPABASE_URL}/rest/v1/feedback?select=name,message"
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}"
    }
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    return response.json()
