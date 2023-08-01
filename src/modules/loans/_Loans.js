const mongoose = require("mongoose");

const loansSchema = new mongoose.Schema(
  {
    book: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Books",
      required: true,
    },
    admin: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Admin",
      required: true,
    },
    borrower: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Borrowers",
      required: true,
    },
    out_date: {
      type: mongoose.SchemaTypes.Date,
      default: mongoose.now(),
    },
    due_date: {
      type: mongoose.SchemaTypes.Date,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const Loans = mongoose.model("Loans", loansSchema);

module.exports = Loans;
