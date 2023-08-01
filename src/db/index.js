const mongoose = require("mongoose");
const config = require("../shared/config");

const connectToDB = async () => {
  try {
    await mongoose.connect(`mongodb://${config.db.port}/${config.db.name}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB ga ulandi.");
  } catch (err) {
    console.log("DB da xatolik: ", err);
  }
};

module.exports = connectToDB;
