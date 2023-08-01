const { BadRequestError } = require("../../shared/errors");
const Authors = require("./_Authors");

const addAuthors = async (data) => {
  const existing = await Authors.findOne({ name: data.name });

  if (existing) {
    throw new BadRequestError("Authors allaqachon mavjud.");
  }

  const result = await Authors.create(data);
  const { is_deleted, ...rest } = result.toObject();

  return rest;
};

module.exports = addAuthors;
