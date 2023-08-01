const { NotFoundError } = require("../../shared/errors");
const Admin = require("./_Admin");

const showAdmin = async ({ id }) => {
  const admin = await Admin.findById(id).select("-password");

  if (!existing) {
    throw new NotFoundError("Admin topilmadi.");
  }

  return admin;
};

module.exports = showAdmin;
