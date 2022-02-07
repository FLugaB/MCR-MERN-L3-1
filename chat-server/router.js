const express = require("express");
const router = express.Router();


// nodemon runs server is on ?
router.get("/", (req, res) => {
  res.send({ response: "Server Chat Is Running" }).status(200);
});

module.exports = router;