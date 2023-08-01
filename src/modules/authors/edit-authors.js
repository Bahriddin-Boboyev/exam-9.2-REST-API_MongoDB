const { NotFoundError } = require("../../shared/errors");
const Authors = require("./_Authors");

const editAuthors = async ({ id, ...changes }) => {
  const existing = await Authors.findById(id);

  if (!existing || existing.is_deleted) {
    throw new NotFoundError("Authors topilmadi.");
  }

  return Authors.findByIdAndUpdate(id, changes, { new: true }).select('-is_deleted');
};

module.exports = editAuthors;
