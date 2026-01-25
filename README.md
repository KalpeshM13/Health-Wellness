# To run python file 

### Install required extensions
```
pip uvicorn install pydantic fastapi python-dotenv jinja2 groq firebase-admin
```

### Then run this command in terminal 
```
uvicorn main:app --host 0.0.0.0 --port 10000
```