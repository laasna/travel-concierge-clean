import express from 'express';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Root GET route to check server
app.get('/', (req, res) => {
  res.send('Travel Concierge backend is running!');
});

// POST /generate-itinerary - mock example
app.post('/generate-itinerary', async (req, res) => {
  const {
    travelType,
    destination,
    cuisine,
    season,
    travelMode
  } = req.body;

  // MOCK: Replace this with your real Vertex AI call to generate itinerary dynamically
  // For demo, create a 3-day itinerary with custom messages:
  const itinerary = [
    `Day 1: Explore ${destination}, enjoy ${cuisine} cuisine, experience ${travelType} activities. Travel mode: ${travelMode}.`,
    `Day 2: Visit popular attractions in ${destination} during the ${season}. Try more delicious ${cuisine} dishes!`,
    `Day 3: Relax and enjoy the local culture in ${destination}. Departure by ${travelMode}.`
  ];

  res.json({ itinerary });
});

// Start server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
