const { hashSync } = require("bcryptjs");
const { BadRequestError } = require("../../shared/errors");
const Admin = require("./_Admin");

const addAdmin = async (data) => {
  const existing = await Admin.findOne({ username: data.username });

  if (existing) {
    throw new BadRequestError("Admin allaqachon mavjud.");
  }

  const chunk = {
    password: hashSync(data.password, 10),
    is_super: false,
  };

  const result = await Admin.create({ ...data, ...chunk });

  const { password, is_deleted, is_super, ...rest } = result.toObject();

  return rest;
};

module.exports = addAdmin;
