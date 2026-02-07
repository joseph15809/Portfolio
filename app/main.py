from fastapi import FastAPI, Request, Response, HTTPException, Form
from fastapi.responses import Response, HTMLResponse, RedirectResponse, JSONResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import smtplib
from email.message import EmailMessage
import os

app = FastAPI()

templates = Jinja2Templates(directory="app/static")
app.mount("/static", StaticFiles(directory="app/static"), name="static")

def read_html(file_path: str) -> str:
    with open(file_path, "r") as f:
        return f.read() 

@app.get("/", response_class=HTMLResponse)
def home_html(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/pinball", response_class=HTMLResponse)
def home_html(request: Request):
    return templates.TemplateResponse("pinball.html", {"request": request})

def send_email(name: str, email: str, message: str) -> None:
    msg = EmailMessage()
    msg["Subject"] = f"Portfolio contact from {name}"
    msg["From"] = os.environ["MAIL_FROM"]
    msg["To"] = os.environ["MAIL_TO"]

    msg.set_content(
        f"Name: {name}\n"
        f"Email: {email}\n\n"
        f"Message:\n{message}\n"
    )

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
        smtp.login(os.environ["MAIL_FROM"], os.environ["MAIL_APP_PASSWORD"])
        smtp.send_message(msg)

@app.post("/contact")
def contact(
    name: str = Form(...),
    email: str = Form(...),
    message: str = Form(...),
    ):
    send_email(name.strip(), email.strip(), message.strip())
    return JSONResponse({"ok": True})