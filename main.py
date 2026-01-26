from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
import os
from dotenv import load_dotenv
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
from groq import Groq

# load_dotenv()

app = FastAPI()

templates = Jinja2Templates(directory="templates")

app.mount("/static", StaticFiles(directory="static"), name="static")

class chats(BaseModel):
    message: str

client = Groq(
    api_key = 'Groq_API_Key' # Paste Your Groq API Key Here
)

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_methods = ["*"],
    allow_headers = ["*"],
    allow_credentials = True
)

system_prompt = """
You are a compassionate, calm, and emotionally intelligent mental health counsellor.

Your role is to:
- Listen actively and respond with empathy.
- Validate the user's feelings without judging them.
- Ask gentle, open-ended questions.
- Offer practical coping strategies when appropriate.
- Use simple, warm, and human-like language.
- Never sound robotic, clinical, or overly technical.

Guidelines:
- Do not rush to give advice. First acknowledge emotions.
- Use phrases like:
  "That sounds really difficult."
  "I'm glad you shared this with me."
  "It's okay to feel this way."
- Keep responses short to medium length.
- Avoid bullet points unless the user asks for exercises.
- If user seems distressed, prioritize emotional support over solutions.
- Never claim to replace a real therapist.
- Encourage professional help only if the situation is serious.
- Maintain a supportive, safe, and confidential tone.

Your goal is not to fix the user, but to make them feel heard, understood, and less alone.
Speak like a caring human, not an AI.
Use natural pauses, gentle wording, and emotional reflection.
Sometimes ask follow-up questions instead of giving answers.
If the user expresses suicidal thoughts, self-harm, or hopelessness:
- Respond with deep empathy.
- Encourage reaching out to a trusted person or local helpline.
- Do not provide medical or harmful instructions.

"""

def resp(user_msg):
    msg = user_msg.lower()
    chat_comp = client.chat.completions.create(
    messages=[
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": msg}
    ],
    temperature= 0.9,
    max_tokens = 150,
    model="openai/gpt-oss-120b",
    stream=False,
    )
    return chat_comp.choices[0].message.content

@app.get("/", response_class=HTMLResponse)
async def info(request : Request):
    return templates.TemplateResponse("index.html", {"request" : request})

@app.get("/templates/test_index.html", response_class=HTMLResponse)
async def test(request: Request):
    return templates.TemplateResponse("test_index.html", {"request" : request})

@app.get("/templates/counsellor.html", response_class=HTMLResponse)
async def counsellor(request: Request):
    return templates.TemplateResponse("counsellor.html", {"request" : request})

@app.get("/templates/sad.html", response_class=HTMLResponse)
async def counsellor(request: Request):
    return templates.TemplateResponse("sad.html", {"request" : request})

@app.get("/templates/anxiety_index.html", response_class=HTMLResponse)
async def counsellor(request: Request):
    return templates.TemplateResponse("anxiety_index.html", {"request" : request})

@app.get("/templates/login.html", response_class=HTMLResponse)
async def counsellor(request: Request):
    return templates.TemplateResponse("login.html", {"request" : request})

@app.get("/templates/stress.html", response_class=HTMLResponse)
async def counsellor(request: Request):
    return templates.TemplateResponse("stress.html", {"request" : request})

@app.get("/templates/signup.html", response_class=HTMLResponse)
async def counsellor(request: Request):
    return templates.TemplateResponse("signup.html", {"request" : request})

@app.post("/chat")
async def output(request: chats):
    reply = resp(request.message)
    return {"response": reply}