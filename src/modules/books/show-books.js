const { NotFoundError } = require("../../shared/errors");
const Books = require("./_Books");

const showBooks = async ({ id }) => {
  const books = await Books.findOne({ _id: id })
    .populate([
      {
        path: "author",
        select: "name",
      },
      {
        path: "publisher",
        select: "name",
      },
    ])
    .select("is_deleted");

  if (!books) {
    throw new NotFoundError("Books topilmadi.");
  }

  return books;
};

module.exports = showBooks;
