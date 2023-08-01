const { NotFoundError } = require("../../shared/errors");
const Borrowers = require("./_Borrowers");

const listBorrowers = async ({
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
  const borrowers = Borrowers.find(filters).select("-is_deleted");
  //
  const totalPage = (await borrowers.clone()).length;
  //
  borrowers
    .sort({ [sort.by]: sort.order.toLocaleUpperCase() == "ASC" ? 1 : -1 })
    .skip(page.offset)
    .limit(page.limit);

  const result = await borrowers;

  if (!result.length) {
    throw new NotFoundError("Borrowers bo'sh");
  }

  return { list: result, pageInfo: { ...page, totalPage } };
};

module.exports = listBorrowers;
