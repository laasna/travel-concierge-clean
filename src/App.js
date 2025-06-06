import React, { useState } from "react";

const questions = [
  {
    key: "destination",
    question: "Where do you want to travel?",
    options: ["Domestic US", "Paris", "Switzerland", "Turkey", "Madrid"],
  },
  {
    key: "cuisine",
    question: "Preferred cuisine?",
    options: ["Italian", "Mexican", "Indian", "Chinese"],
  },
  {
    key: "season",
    question: "What season are you traveling in?",
    options: ["Spring", "Summer", "Autumn", "Winter"],
  },
  {
    key: "travelType",
    question: "Type of travel?",
    options: ["Family-friendly", "Romantic", "Adventure", "Relaxation"],
  },
  {
    key: "travelMode",
    question: "Preferred mode of travel?",
    options: ["Direct flight", "Stopover flight", "Train", "Bus"],
  },
];

export default function App() {
  const [answers, setAnswers] = useState({
    destination: "",
    cuisine: "",
    season: "",
    travelType: "",
    travelMode: "",
  });

  const [itinerary, setItinerary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    for (const key of Object.keys(answers)) {
      if (!answers[key]) {
        setError(`Please select an option for ${key}`);
        return;
      }
    }

    setError("");
    setLoading(true);
    setItinerary("");

    try {
      const response = await fetch("http://localhost:3001/generate-itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      });

      if (!response.ok) {
        throw new Error("Server error: " + response.statusText);
      }

      const data = await response.json();
      setItinerary(data.itinerary);
    } catch (err) {
      setError(err.message || "Failed to fetch itinerary");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", fontFamily: "Arial, sans-serif" }}>
      <h1>Travel Concierge</h1>

      <form onSubmit={handleSubmit}>
        {questions.map(({ key, question, options }) => (
          <div key={key} style={{ marginBottom: 20 }}>
            <p><strong>{question}</strong></p>
            {options.map((option) => (
              <label key={option} style={{ display: "block", marginBottom: 5 }}>
                <input
                  type="radio"
                  name={key}
                  value={option}
                  checked={answers[key] === option}
                  onChange={handleChange}
                />
                {" "}{option}
              </label>
            ))}
          </div>
        ))}

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button
          type="submit"
          style={{
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            padding: "10px 20px",
            cursor: "pointer",
            fontSize: "16px",
            borderRadius: "5px",
          }}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Plan"}
        </button>
      </form>

      {itinerary && (
        <div style={{ marginTop: 30, whiteSpace: "pre-line", backgroundColor: "#f0f8ff", padding: 20, borderRadius: 8 }}>
          <h2>Your Itinerary</h2>
          <p>{itinerary}</p>
        </div>
      )}
    </div>
  );
}
