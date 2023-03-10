const express = require("express");
const path = require("path");
const fs = require("fs-extra");
const multer = require("multer");
const excelToJson = require("convert-excel-to-json");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const app = express();
const axios = require("axios");
const File = require("./model/File");
DB_URI =
  "mongodb+srv://nduduzo:yI2FQI7FUGLwrFem@cluster0.17eozap.mongodb.net/finsights?retryWrites=true&w=majority";

// middleware - cors to allow access from all domains, use json and serve static files
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// connect to DB
dotenv.config();
mongoose
  .connect(DB_URI)
  .then(console.log("\n>>> MONGO_DB CONNECTION ESTABLISHED <<<\n"))
  .catch((err) => console.log("ERROR OCCURED WHILE CONNECTING TO DB:\n", err));

// file upload destination
const uploads = multer({ dest: "uploads/" });
// routes
app.post("/upload", uploads.single("the-file"), (req, res) => {
  // handle a file uploaded - error 400 if user did not select a file to upload
  // otherwise set filepath as target for excel-to-json library to use as source
  // skip the first row in the file (it contains headings)
  try {
    if (req.file?.filename == null || req.file?.filename == "undefined") {
      res.status(400).json("no file found");
    } else {
      const filePath = `uploads/${req.file.filename}`;
      const excelData = excelToJson({
        sourceFile: filePath,
        header: {
          rows: 1,
        },
        columnToKey: {
          "*": "{{columnHeader}}",
        },
      });
      // remove the file after its been processed to JSON then respond with the JSON data
      fs.remove(filePath);
      // persist data
      const newFile = new File(excelData);
      newFile.save();
      // respond with the transformed data
      res.status(200).json(excelData);
    }
    // catch errors and respond with appropriate status code
  } catch (error) {
    console.log("ERROR:\n", error);
    res.status(500).json(error);
  }
});

// fetching data from DB
app.get("/insights", async (req, res) => {
  try {
    const files = await File.find();
    res.status(200).json(files);
  } catch (err) {
    console.log("\nERROR WHILE FETCHING MONGO DOCUMENTS:\n", err);
    res.status(500).json(err);
  }
});

// run server
app.listen(PORT, () =>
  console.log(`\nSERVER RUNNING: [http://localhost:${PORT}]\n`)
);
