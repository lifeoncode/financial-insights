const express = require("express");
const path = require("path");
const fs = require("fs-extra");
const multer = require("multer");
const excelToJson = require("convert-excel-to-json");
const PORT = process.env.PORT || 5000;
const app = express();

// middleware - use json and serve static files
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// file upload destination
const upload = multer({ dest: "uploads/" });

// routes
app.post("/read", upload.single("file"), (req, res) => {
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
    res.status(500).json(error);
  }
});

// run server
app.listen(PORT, () => console.log(`SERVER RUNNING: [PORT ${PORT}]`));
