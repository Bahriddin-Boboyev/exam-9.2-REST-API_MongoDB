const mongoose = require("mongoose");

const booksSchema = new mongoose.Schema(
  {
    title: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    copies: {
      type: mongoose.SchemaTypes.Number,
      required: true,
    },
    publisher: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Publishers",
      required: true,
    },
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Authors",
      required: true,
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

const Books = mongoose.model("Books", booksSchema);

module.exports = Books;
