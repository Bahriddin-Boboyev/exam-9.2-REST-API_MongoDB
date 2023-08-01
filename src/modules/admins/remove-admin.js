const { NotFoundError, BadRequestError } = require("../../shared/errors");
const Admin = require("./_Admin");

const removeAdmin = async ({ id }) => {
  const existing = await Admin.findById(id);

  if (!existing || existing.is_deleted) {
    throw new NotFoundError("Admin topilmadi.");
  }

  if (existing.is_super) {
    throw new BadRequestError("Super admin o'zini o'chira olmaydi!");
  }

  await Admin.findByIdAndUpdate(id, {
    is_deleted: true,
    username: `${existing.username}_deleted`,
  });

  return "Admin o'chirildi!";
};

module.exports = removeAdmin;
