const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    full_name: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    username: {
      type: mongoose.SchemaTypes.String,
      required: true,
      unique: true,
    },
    password: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    is_super: {
      type: mongoose.SchemaTypes.Boolean,
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

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
