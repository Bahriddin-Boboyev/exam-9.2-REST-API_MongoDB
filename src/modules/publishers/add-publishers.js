const { BadRequestError } = require("../../shared/errors");
const Publishers = require("./_Publishers");

const addPublishers = async (data) => {
  const existing = await Publishers.findOne({ phone: data.phone });

  if (existing) {
    throw new BadRequestError("Publishers allaqachon mavjud.");
  }

  const result = await Publishers.create(data);
  const { is_deleted, ...rest } = result.toObject();
  return rest;
};

module.exports = addPublishers;
