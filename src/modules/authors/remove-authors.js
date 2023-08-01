const { NotFoundError } = require("../../shared/errors");
const Authors = require("./_Authors");

const removeAuthors = async ({ id }) => {
  const existing = await Authors.findById(id);

  if (!existing || existing.is_deleted) {
    throw new NotFoundError("Authors topilmadi.");
  }

  const result = await Authors.findByIdAndUpdate(id, {
    is_deleted: true,
    name: `${existing.name}_deleted`,
  });

  return "Authors o'chirildi!";
};

module.exports = removeAuthors;
