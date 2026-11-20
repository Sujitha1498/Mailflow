
import React, { useState } from "react";
import { sendBulkEmail } from "../services/emailService";
import { FiSend } from "react-icons/fi";

function EmailForm({ onEmailSent }) {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [recipients, setRecipients] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const recipientList = recipients
      .split(",")
      .map((email) => email.trim())
      .filter(Boolean);

    if (!subject.trim() || !body.trim() || recipientList.length === 0) {
      setMessage("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await sendBulkEmail({
        subject,
        body,
        recipients: recipientList,
      });

      setMessage(
        `Completed! Sent: ${response.data.sentCount}, Failed: ${response.data.failedCount}`
      );

      setSubject("");
      setBody("");
      setRecipients("");
      onEmailSent();
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Unable to send emails. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="email-card" id="compose">
      <h2>Compose Email</h2>
      <p className="section-description">
        Send one message to multiple recipients.
      </p>

      <form onSubmit={handleSubmit}>
        <label>Recipients</label>
        <textarea
          placeholder="Enter email addresses separated by commas"
          value={recipients}
          onChange={(e) => setRecipients(e.target.value)}
          rows="3"
        />

        <label>Subject</label>
        <input
          type="text"
          placeholder="Enter email subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <label>Email Message</label>
        <textarea
          placeholder="Write your email message..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows="6"
        />

        {message && <p className="status-message">{message}</p>}

        <button type="submit" disabled={loading}>
          <FiSend />
          {loading ? "Sending..." : "Send Bulk Email"}
        </button>
      </form>
    </section>
  );
}

export default EmailForm;
