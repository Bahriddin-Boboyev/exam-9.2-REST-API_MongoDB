const { NotFoundError } = require("../../shared/errors");
const Borrowers = require("./_Borrowers");

const removeBorrowers = async ({ id }) => {
  const existing = await Borrowers.findById(id);

  if (!existing || existing.is_deleted) {
    throw new NotFoundError("Borrowers topilmadi.");
  }

  const result = await Borrowers.findByIdAndUpdate(id, {
    is_deleted: true,
    phone: `${existing.phone}_deleted`,
  });

  return "Borrowers o'chirildi!";
};

module.exports = removeBorrowers;
