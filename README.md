# Health-Wellness

**Introduction**

Health-Wellness is a small FastAPI web application that provides a compassionate, conversational mental health counsellor interface. The app serves static front-end pages from the `templates` and `static` folders and uses a Groq-driven chat completion in `main.py` to generate empathetic responses.

**Features**
- **Empathetic chat**: A simple counsellor-style chat powered by the Groq client.
- **Multiple pages**: Prebuilt templates for stress, anxiety, sadness, and more.
- **Static assets**: CSS and JS under the `static` folder for the front-end.

**Prerequisites**
- Python 3.10 or later
- Git (optional, to clone the repo)

**Quick Setup (Windows)**
1. Clone the repo (or unzip/copy the project folder):

```powershell
git clone <repo-url>
cd "Health-Wellness"
```

2. Create and activate a virtual environment:

```powershell
python -m venv venv
.\\venv\\Scripts\\Activate.ps1   # PowerShell
```

If using Command Prompt:

```cmd
venv\\Scripts\\activate
```

3. Install dependencies:

```powershell
pip install -r requirements.txt
```

**Environment / API Key**
- Create a `.env` file in the project root:

```dotenv
GROQ_API_KEY=your_groq_api_key
```

- `main.py` loads this value through `python-dotenv`. Do not commit `.env`; it is excluded by `.gitignore`.

**Run the app**

```powershell
uvicorn main:app --reload
```

Open your browser at: http://127.0.0.1:8000

**Project layout (important files)**
- **App entry**: [main.py](main.py)
- **Templates**: [templates](templates)
- **Static assets**: [static](static)
- **Dependencies**: [requirements.txt](requirements.txt)

**Notes & Security**
- Do not commit or publish your API keys. Prefer environment variables or a secret manager.

---