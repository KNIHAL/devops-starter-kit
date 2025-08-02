import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css"; // 👈 make sure this import is included

export default function FeedbackForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [feedbackList, setFeedbackList] = useState([]);

  const fetchFeedback = async () => {
    try {
      const res = await axios.get("http://localhost:5000/feedback/all");
      setFeedbackList(res.data.feedback || []);
    } catch (err) {
      console.error("❌ Failed to load feedback list:", err);
      setStatus("❌ Could not load feedback list.");
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !message.trim()) {
      setStatus("❌ Both name and message are required.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/feedback", {
        name,
        message,
      });

      if (res.status === 200 && res.data.status === "success") {
        setStatus("✅ Feedback submitted!");
        setName("");
        setMessage("");
        fetchFeedback();
      } else {
        setStatus(`❌ Error: ${res.data.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Axios error:", err);
      if (err.response) {
        setStatus(`❌ Server error ${err.response.status}: ${err.response.data?.error || "Unknown error"}`);
      } else {
        setStatus("❌ Could not connect to server.");
      }
    }
  };

  return (
    <div className="feedback-container">
      <h1 className="form-title">Kn☁️hal Feedback App</h1>

      <form onSubmit={handleSubmit} className="feedback-form">
        <h2 className="form-title">💬 Submit Your Feedback</h2>
        <input
          className="input-field"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          className="textarea-field"
          placeholder="Your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="submit-button">Send Feedback</button>
        <p className="status-message">{status}</p>
      </form>

      <hr className="divider" />

      <h3 className="feedback-title">📋 Previous Feedback</h3>
      {feedbackList.length === 0 ? (
        <p className="no-feedback">No feedback submitted yet.</p>
      ) : (
        <ul className="feedback-list">
          {feedbackList.map((item, index) => (
            <li key={index} className="feedback-item">
              <strong>{item.name}:</strong> {item.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
