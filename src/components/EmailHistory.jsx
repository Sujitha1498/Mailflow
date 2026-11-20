
import React, { useEffect, useState } from "react";
import { getEmailHistory } from "../services/emailService";
import { FiClock, FiCheckCircle, FiXCircle } from "react-icons/fi";

function EmailHistory({ refresh }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await getEmailHistory();
        setHistory(response.data.history || []);
      } catch (error) {
        console.error("Unable to fetch email history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [refresh]);

  if (loading) return <p>Loading email history...</p>;

  return (
    <section className="history-card" id="history">
      <h2><FiClock /> Email History</h2>

      {history.length === 0 ? (
        <p className="empty-history">No emails sent yet.</p>
      ) : (
        history.map((item) => (
          <div className="history-item" key={item.id}>
            <div>
              <h3>{item.subject}</h3>
              <p>{new Date(item.date).toLocaleString()}</p>
              <p>{item.recipients.length} recipient(s)</p>
            </div>

            <div className="history-status">
              <span><FiCheckCircle /> {item.sentCount} Sent</span>
              <span><FiXCircle /> {item.failedCount} Failed</span>
            </div>
          </div>
        ))
      )}
    </section>
  );
}

export default EmailHistory;
