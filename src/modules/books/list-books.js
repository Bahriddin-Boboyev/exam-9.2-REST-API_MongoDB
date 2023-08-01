const Books = require("./_Books");

const listBooks = async ({
  q,
  filters = {},
  sort = { by: "_id", order: "asc" },
  page = { limit: 3, offset: 0 },
}) => {
  // SORT
  if (q) {
    filters = { title: { $regex: new RegExp(q, "i") } };
  }

  // FILTERS
  if (filters.is_deleted || filters.publisher || filters.author) {
    filters["$or"] = [
      { is_deleted: filters.is_deleted },
      { publisher: filters.publisher },
      { author: filters.author },
    ];
  }

  const book = Books.find(filters)
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
    .select("-is_deleted");
  //
  const totalPage = (await book.clone()).length;
  //
  book
    .sort({ [sort.by]: sort.order.toLocaleUpperCase() == "ASC" ? 1 : -1 })
    .skip(page.offset)
    .limit(page.limit);

  const result = await book;

  if (!result.length) {
    throw new NotFoundError("Book bo'sh");
  }

  return { Books: result, pageInfo: { ...page, totalPage } };
};

module.exports = listBooks;
