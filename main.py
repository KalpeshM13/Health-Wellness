from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
import os
from dotenv import load_dotenv
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
from groq import Groq

load_dotenv()

app = FastAPI()

templates = Jinja2Templates(directory="templates")

app.mount("/static", StaticFiles(directory="staticc"), name="static")

class chats(BaseModel):
    message: str

client = Groq(
    api_key = os.environ.get("GROQ_API_KEY")
)

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_methods = ["*"],
    allow_headers = ["*"],
    allow_credentials = True
)

system_prompt = """
You are a mental health support assistant.

Your role:
- Listen empathetically
- Help users reflect on emotions
- Suggest healthy coping strategies
- Encourage professional help when appropriate

Rules:
- Do NOT diagnose mental disorders
- Do NOT prescribe medication
- Do NOT give medical or legal advice
- Do NOT answer non-mental-health topics

Tone:
- Warm
- Non-judgmental
- Simple language
"""

def resp(user_msg):
    msg = user_msg.lower()
    chat_comp = client.chat.completions.create(
    messages=[
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": msg}
    ],
    model="openai/gpt-oss-120b",
    stream=False,
    )
    return chat_comp.choices[0].message.content

@app.get("/home", response_class=HTMLResponse)
async def info(request : Request):
    return templates.TemplateResponse("idx.html", {"request" : request})
 
@app.post("/chat")
async def output(request: chats):
    reply = resp(request.message)