from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/")
def home():
    return "Backend is running!"

@app.route("/api/data")
def get_data():
    return jsonify({"message": "Hello from backend!"})

if __name__ == "__main__":
    # Important: bind to 0.0.0.0 so Docker can expose it
    app.run(host="0.0.0.0", port=5000, debug=True)

