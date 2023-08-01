const mongoose = require("mongoose");

const authorsSchema = new mongoose.Schema(
  {
    name: {
      type: mongoose.SchemaTypes.String,
      required: true,
      unique: true,
    },
    is_deleted: {
      type: mongoose.SchemaTypes.Boolean,
      required: true,
      default: false,
    },
  },
  {
    versionKey: false,
  }
);

const Authors = mongoose.model("Authors", authorsSchema);

module.exports = Authors;
