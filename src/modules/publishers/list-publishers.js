const { NotFoundError } = require("../../shared/errors");
const Publishers = require("./_Publishers");

const listPublishers = async ({
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
  const publishers = Publishers.find(filters).select("-is_deleted");
  //
  const totalPage = (await publishers.clone()).length;
  //
  publishers
    .sort({ [sort.by]: sort.order.toLocaleUpperCase() == "ASC" ? 1 : -1 })
    .skip(page.offset)
    .limit(page.limit);

  const result = await publishers;

  if (!result.length) {
    throw new NotFoundError("Publishers bo'sh");
  }

  return { list: result, pageInfo: { ...page, totalPage } };
};

module.exports = listPublishers;
