const { NotFoundError } = require("../../shared/errors");
const Books = require("./_Books");

const removeBooks = async ({ id }) => {
  const existing = await Books.findById(id);

  if (!existing || existing.is_deleted) {
    throw new NotFoundError("Books topilmadi.");
  }

  const result = await Books.findByIdAndUpdate(id, {
    is_deleted: true,
    title: `${existing.title}_deleted`,
  });

  return "Books o'chirildi!";
};

module.exports = removeBooks;
