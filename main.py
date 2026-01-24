from fastapi import FastAPI
from groq import Groq
import os
from dotenv import load_dotenv
from pydantic import BaseModel

load_dotenv()
app = FastAPI()

class Chats:
    messages: str

