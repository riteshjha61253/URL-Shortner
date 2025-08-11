const express = require("express");
const shortid = require("shortid");
const Url = require("../models/Url");
const router = express.Router();

router.post("/shorten", async (req, res) => {
  try {
    const { original_url } = req.body;
    if (!original_url)
      return res.status(400).json({ error: "URL is required" });

    let short_code = shortid.generate();
    const newUrl = await Url.create({ original_url, short_code });

    res.json({ short_url: `${process.env.BASE_URL}/api/${short_code}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/admin/urls", async (req, res) => {
  const adminToken = req.headers["x-admin-token"];
  if (adminToken !== process.env.ADMIN_TOKEN) {
    return res.status(403).json({ error: "Forbidden" });
  }

  try {
    const urls = await Url.find().sort({ createdAt: -1 });
    res.json(urls);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:shortcode", async (req, res) => {
  try {
    const url = await Url.findOne({ short_code: req.params.shortcode });
    if (!url) return res.status(404).send("URL not found");

    url.visit_count += 1;
    await url.save();

    res.redirect(url.original_url);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
