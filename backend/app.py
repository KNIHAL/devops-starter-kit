from flask import Flask, request, jsonify
from flask_cors import CORS
from supabase import save_feedback  # 👈 importing from supabase.py
import traceback


app = Flask(__name__)
CORS(app)


@app.route("/feedback", methods=["POST"])
def handle_feedback():
    data = request.get_json()
    if not data or "name" not in data or "message" not in data:
        return jsonify({"error": "Name and message required"}), 400
    try:
        save_feedback(data["name"], data["message"])
        return jsonify({"status": "success"}), 200
    except Exception as e:
        print("Save failed:", str(e))
        traceback.print_exc()  
        return jsonify({"status": "error", "error": str(e)}), 500
@app.route("/health", methods=["GET"])
def health():
    return "OK", 200

if __name__ == "__main__":
    app.run(debug=True)
