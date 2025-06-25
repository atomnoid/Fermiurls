const express = require("express");
const { nanoid } = require("nanoid");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 3000;

const urls = {};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files
app.use(express.static(path.join(__dirname, "public")));

// API to shorten URL
app.post("/shorten", (req, res) => {
  const { longUrl } = req.body;
  if (!longUrl) return res.status(400).json({ error: "URL is required" });

  const shortCode = nanoid(6);
  urls[shortCode] = longUrl;
  const shortUrl = `${req.protocol}://${req.get("host")}/${shortCode}`;

  res.json({ shortUrl });
});

// Redirect for shortened URL
app.get("/:code", (req, res) => {
  const { code } = req.params;
  const longUrl = urls[code];
  if (longUrl) {
    res.redirect(longUrl);
  } else {
    res.status(404).send("URL not found");
  }
});

app.listen(port, () => {
  console.log(`🚀 Fermiurls backend running at http://localhost:${port}`);
});
