## Demo-Docker-File

```
FROM node:18-slim

# Set work directory
WORKDIR /app

# Copy package.json first (for caching layers)
COPY package.json /app/

# Install dependencies
RUN npm install

# Copy source code
COPY . /app

# Expose port
EXPOSE 5000

# Start app
CMD ["npm", "start"]

```

## index.html

```
<!DOCTYPE html>
<html>
<head>
  <title>Hello World</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background: linear-gradient(135deg, #89f7fe, #66a6ff);
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .card {
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(10px);
      border-radius: 16px;
      padding: 40px;
      text-align: center;
      color: #fff;
      box-shadow: 0 8px 32px rgba(0,0,0,0.2);
      animation: fadeIn 2s ease-in-out;
    }

    h1 {
      font-size: 2.5em;
      margin-bottom: 20px;
      color: #fff;
      text-shadow: 0 0 10px rgba(255,255,255,0.8);
      border-right: 3px solid #fff;
      white-space: nowrap;
      overflow: hidden;
      width: 0;
      animation: typing 3s steps(40, end) forwards, blink 0.75s step-end infinite;
    }

    button {
      background: #ff7eb3;
      border: none;
      padding: 14px 28px;
      border-radius: 8px;
      font-size: 1em;
      color: white;
      cursor: pointer;
      transition: transform 0.2s ease, background 0.3s;
      animation: float 3s ease-in-out infinite;
    }

    button:hover {
      transform: scale(1.1);
      background: #ff4d94;
    }

    #message {
      margin-top: 20px;
      font-size: 1.2em;
      min-height: 24px;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }

    @keyframes typing {
      from { width: 0 }
      to { width: 100% }
    }

    @keyframes blink {
      50% { border-color: transparent }
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>Hello World from Node.js on Kubernetes 🚀</h1>
    <button onclick="showMessage()">Click Me 🎉</button>
    <div id="message"></div>
  </div>

  <script>
    function showMessage() {
      const messages = [
        "Kubernetes is awesome! ⚡",
        "Scaled across replicas 💎",
        "Rolling updates made easy 🔄",
        "Hello from your cluster 🐳",
        "You're running on Node.js 🚀",
        "Zero downtime deployments 😎",
        "Pods dancing across nodes 💃"
      ];
      const random = messages[Math.floor(Math.random() * messages.length)];
      document.getElementById('message').innerText = random;
    }
  </script>
</body>
</html>
```

## package.json

```

{
  "name": "hello-node",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

## Server.js
```
const express = require("express");
const path = require("path");

const app = express();
const PORT = 5000;

// Serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

```


