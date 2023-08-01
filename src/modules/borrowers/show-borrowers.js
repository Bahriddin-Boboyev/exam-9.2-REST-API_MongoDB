const { NotFoundError } = require("../../shared/errors");
const Borrowers = require("./_Borrowers");

const showBorrowers = async ({ id }) => {
  const borrowers = await Borrowers.findById(id);

  if (!borrowers) {
    throw new NotFoundError("Borrowers topilmadi.");
  }

  return borrowers;
};

module.exports = showBorrowers;
