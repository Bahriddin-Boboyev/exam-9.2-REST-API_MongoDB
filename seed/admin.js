const Admin = require("../src/modules/admins/_Admin");
const bcrypt = require("bcryptjs");
const config = require("../src/shared/config");
const { default: mongoose } = require("mongoose");

mongoose
  .connect(`mongodb://${config.db.port}/${config.db.name}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGO CONNECT OPEN");
  })
  .catch((err) => {
    console.log(err);
  });

const adminSeeds = [
  {
    full_name: "Bahriddin Boboyev",
    username: "bahriddin",
    password: bcrypt.hashSync("12345", 10),
    is_super: true,
  },
];

const seedDB = async () => {
  try {
    await Admin.deleteMany({});
    await Admin.insertMany(adminSeeds);
  } catch (err) {
    console.log("Error seeding database: ", err);
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
