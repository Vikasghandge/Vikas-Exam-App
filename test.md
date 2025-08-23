
```
version: "3.9"
services:
  backend:
    image: python:3.9
    working_dir: /app
    volumes:
      - ./backend:/app
    command: python app.py
    ports:
      - "5000:5000"

  frontend:
    image: nginx:alpine
    volumes:
      - ./frontend:/usr/share/nginx/html
    ports:
      - "8081:80"
```

```
from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return {"message": "Hello from Backend API 🎯"}

app.run(host="0.0.0.0", port=5000)

```

```
<h1>Frontend Page</h1>
<p>Backend API is at: <a href="http://localhost:5000">http://localhost:5000</a></p>

```
