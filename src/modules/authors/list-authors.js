const { NotFoundError } = require("../../shared/errors");
const Authors = require("./_Authors");

const listAuthors = async ({
  q,
  filters = {},
  sort = { by: "_id", order: "asc" },
  page = { limit: 3, offset: 0 },
}) => {
  // SORT
  if (q) {
    filters = { name: { $regex: new RegExp(q, "i") } };
  }

  // FILTERS
  if (filters.is_deleted) {
    filters = { is_deleted: filters.is_deleted };
  }

  const author = Authors.find(filters).select("-is_deleted");
  //
  const totalPage = (await author.clone()).length;
  //
  author
    .sort({ [sort.by]: sort.order.toLocaleUpperCase() == "ASC" ? 1 : -1 })
    .skip(page.offset)
    .limit(page.limit);

  const result = await author;

  if (!result.length) {
    throw new NotFoundError("Authors bo'sh");
  }

  return { list: result, pageInfo: { ...page, totalPage } };
};

module.exports = listAuthors;
