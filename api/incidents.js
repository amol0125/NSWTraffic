export default async function handler(req, res) {
  try {
    const API_KEY = process.env.NSW_API_KEY;

    const response = await fetch(
      "https://api.transport.nsw.gov.au/v1/live/hazards/incident/all",
      {
        headers: {
          Accept: "application/json",
          Authorization: API_KEY,
        },
      }
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Proxy error", details: err.message });
  }
}
