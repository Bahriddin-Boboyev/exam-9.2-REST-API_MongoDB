const { NotFoundError, BadRequestError } = require("../../shared/errors");
const Borrowers = require("./_Borrowers");

const editBorrowers = async ({ id, ...changes }) => {
  const existing = await Borrowers.findById(id);

  if (!existing || existing.is_deleted) {
    throw new NotFoundError("Borrowers topilmadi.");
  }

  return Borrowers.findByIdAndUpdate(id, changes, { new: true }).select(
    "-is_deleted"
  );
};

module.exports = editBorrowers;
