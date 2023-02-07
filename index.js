const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs-extra");
const multer = require("multer");
const excelToJson = require("convert-excel-to-json");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const app = express();

// middleware - cors to allow access from all domains, use json and serve static files
// app.use(bodyParser.json());
// for parsing application/xwww-
// app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

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
      res.status(200).json(excelData);
    }
    // catch errors and respond with appropriate status code
  } catch (error) {
    console.log("ERROR:\n", error);
    res.status(500).json(error);
  }
});

// run server
app.listen(PORT, () => console.log(`SERVER RUNNING: [PORT ${PORT}]`));
