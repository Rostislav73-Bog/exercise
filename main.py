from fastapi import FastAPI, UploadFile, File
from fastapi.responses import HTMLResponse, FileResponse
from pypandoc import convert_file

from starlette.staticfiles import StaticFiles

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get("/", response_class=HTMLResponse)
async def get():
    return FileResponse("main.html")


@app.post("/file")
async def upload_file(file: UploadFile = File(...)):
    content = await file.read()
    f = content.decode("utf-8")
    print(type(f))
    print(f)

    data = {
        'filename': file.filename,
        'file': content
    }
    return {'data': data}
