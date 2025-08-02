import { useState } from "react";

export default function FeedbackForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, message }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("✅ Feedback submitted!");
        setName("");
        setMessage("");
      } else {
        setStatus(`❌ Error: ${data.error}`);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setStatus("❌ Server error or invalid JSON");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <textarea
        placeholder="Your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <br />
      <button type="submit">Send Feedback</button>
      <p>{status}</p>
    </form>
  );
}
