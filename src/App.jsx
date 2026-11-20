
import React, { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import EmailForm from "./components/EmailForm.jsx";
import EmailHistory from "./components/EmailHistory.jsx";
import "./App.css";

function App() {
  const [refreshHistory, setRefreshHistory] = useState(0);

  const handleEmailSent = () => {
    setRefreshHistory((previous) => previous + 1);
  };

  return (
    <>
      <Navbar />

      <main className="dashboard" id="dashboard">
        <section className="welcome-section">
          <h1>Welcome to MailFlow!</h1>
          <p>
            Your simple and reliable bulk email management platform.
          </p>
        </section>

        <section id="compose">
          <EmailForm onEmailSent={handleEmailSent} />
        </section>

        <section id="history">
          <EmailHistory refresh={refreshHistory} />
        </section>
      </main>
    </>
  );
}

export default App;
