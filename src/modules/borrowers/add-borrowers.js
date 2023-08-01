const { BadRequestError } = require("../../shared/errors");
const Borrowers = require("./_Borrowers");

const addBorrowers = async (data) => {
  const existing = await Borrowers.findOne({ phone: data.phone });

  if (existing) {
    throw new BadRequestError("Borrowers allaqachon mavjud.");
  }

  const result = await Borrowers.create(data);
  const { is_deleted, ...rest } = result.toObject();
  return rest;
};

module.exports = addBorrowers;
