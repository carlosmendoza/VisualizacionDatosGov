const express = require("express");
const router = express.Router();

router.get("/consulta", (req, res) => {
  req.db
    .collection("historialCollection")
    .aggregate([
      {"$group" : {_id:"$url", count:{$sum:1}}}
    ])
    .toArray((err, result) => {
      if (err) res.status(500).json({ message: err.message });

      res.json(result);
    });
});

router.get("/", (req, res) => {
  req.db
    .collection("historialCollection")
    .find()
    .toArray((err, result) => {
      if (err) res.status(500).json({ message: err.message });

      res.json(result);
    });
});



router.post("/", (req, res) => {
    req.db.collection("historialCollection").insert(req.body, (err, result) => {
      if (err) return res.status(400).json({ message: err.message });
  
      res.status(201).json(req.body);
    });
  });
module.exports = router;