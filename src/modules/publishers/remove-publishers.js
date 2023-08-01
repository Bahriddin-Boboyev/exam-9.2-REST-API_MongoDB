const { NotFoundError } = require("../../shared/errors");
const Publishers = require("./_Publishers");

const removePublishers = async ({ id }) => {
  const existing = await Publishers.findById(id);

  if (!existing || existing.is_deleted) {
    throw new NotFoundError("Publishers topilmadi.");
  }

  const result = await Publishers.findByIdAndUpdate(id, {
    is_deleted: true,
    name: `${existing.name}_deleted`,
  });

  return "Publishers o'chirildi!";
};

module.exports = removePublishers;
