const { NotFoundError } = require("../../shared/errors");
const Admin = require("./_Admin");

const editMe = async ({ id, ...changes }) => {
  const existing = await Admin.findById(id);

  if (!existing || existing.is_deleted) {
    throw new NotFoundError("Admin topilmadi.");
  }

  return Admin.findByIdAndUpdate(id, changes, { new: true }).select(
    "-is_deleted -is_super"
  );
};

module.exports = editMe;
