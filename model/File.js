const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fileSchema = new Schema({
  "Sheet 1": {
    type: ["Mixed"],
  },
});

module.exports = mongoose.model("File", fileSchema);
