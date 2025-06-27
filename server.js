const express = require("express");
const cors = require("cors");
const path = require("path");
const { nanoid } = require("nanoid");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));  // serve index.html & urls.html etc

const urlDatabase = {};

// shorten API
app.post("/shorten", (req, res) => {
  const { longUrl } = req.body;
  const shortId = nanoid(6);
  const shortUrl = `http://fermiurl:${PORT}/${shortId}`;
  urlDatabase[shortId] = longUrl;
  res.json({ shortUrl });
});

// redirect API
app.get("/:shortId", (req, res) => {
  const shortId = req.params.shortId;
  const longUrl = urlDatabase[shortId];
  if (longUrl) {
    res.redirect(longUrl);
  } else {
    res.status(404).send("URL not found");
  }
});

// start server
app.listen(PORT, () => {
  console.log(`Fermiurls server running at http://localhost:${PORT}`);
});
