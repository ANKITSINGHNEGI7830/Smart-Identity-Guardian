const express = require("express");
const multer = require("multer");
const axios = require("axios");
const path = require("path");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.static("public"));

app.post(
  "/verify",
  upload.fields([
    { name: "idCard", maxCount: 1 },
    { name: "selfie", maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      if (!req.files.idCard || !req.files.selfie) {
        return res.status(400).send("Both ID card and selfie are required");
      }

      console.log("ID Card:", req.files.idCard[0].path);
      console.log("Selfie:", req.files.selfie[0].path);

      // 🔥 FUTURE:
      // Upload to S3
      // Call API Gateway → Lambda

      // Dummy response for now
      res.json({
        status: "SUCCESS",
        message: "Files received. Verification triggered."
      });

    } catch (error) {
      console.error(error);
      res.status(500).send("Verification failed");
    }
  }
);

app.listen(3000, () => {
  console.log("Frontend running on port 3000");
});
