const { NotFoundError } = require("../../shared/errors");
const Publishers = require("./_Publishers");

const editPublishers = async ({ id, ...changes }) => {
  const existing = await Publishers.findById(id);

  if (!existing || existing.is_deleted) {
    throw new NotFoundError("Publishers topilmadi.");
  }

  return Publishers.findByIdAndUpdate(id, changes, { new: true }).select(
    "-is_deleted"
  );
};

module.exports = editPublishers;
