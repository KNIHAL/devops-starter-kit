from flask import Flask, request, jsonify
from flask_cors import CORS
from supabase import save_feedback, get_all_feedback
import traceback

app = Flask(__name__)
CORS(app)

@app.route("/feedback", methods=["POST"])
def handle_feedback():
    try:
        raw_data = request.data.decode("utf-8")
        print("📦 Raw body:", raw_data)

        data = request.get_json(force=True)

        if not data or "name" not in data or "message" not in data:
            return jsonify({"error": "Both 'name' and 'message' are required."}), 400

        name = data.get("name", "").strip()
        message = data.get("message", "").strip()

        if not name or not message:
            return jsonify({"error": "Fields cannot be empty."}), 400

        print(f"📥 Feedback received from {name}: {message}")

        try:
            save_feedback(name, message)
        except Exception as db_error:
            print("❌ Supabase error:", db_error)
            traceback.print_exc()
            return jsonify({"error": "Failed to save feedback to Supabase."}), 500

        return jsonify({"status": "success"}), 200

    except Exception as e:
        print("❌ General error:", e)
        traceback.print_exc()
        return jsonify({"status": "error", "error": str(e)}), 500

@app.route("/feedback/all", methods=["GET"])
def get_all():
    try:
        feedback = get_all_feedback()
        return jsonify({"feedback": feedback}), 200
    except Exception as e:
        print("❌ Failed to fetch feedback:", e)
        traceback.print_exc()
        return jsonify({"error": "Failed to fetch feedback"}), 500

@app.route("/health", methods=["GET"])
def health():
    return "OK", 200

if __name__ == "__main__":
    app.run(debug=True)
