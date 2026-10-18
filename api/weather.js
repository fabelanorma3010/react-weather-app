const axios = require("axios");

module.exports = async function weather(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const { type, query } = req.query;
  if (
    (type !== "current" && type !== "forecast") ||
    typeof query !== "string" ||
    !query.trim()
  ) {
    return res.status(400).json({ error: "A valid type and city are required." });
  }

  const apiKey = process.env.SHECODES_API_KEY;
  if (!apiKey) {
    console.error("SHECODES_API_KEY is not configured.");
    return res.status(500).json({ error: "Weather service is not configured." });
  }

  try {
    const response = await axios.get(
      `https://api.shecodes.io/weather/v1/${type}`,
      {
        params: { query: query.trim(), key: apiKey, units: "metric" },
      }
    );
    return res.status(200).json(response.data);
  } catch (error) {
    console.error(
      "SheCodes weather request failed.",
      error.response ? `HTTP ${error.response.status}` : "Network error"
    );
    return res.status(502).json({ error: "Unable to retrieve weather data." });
  }
};
