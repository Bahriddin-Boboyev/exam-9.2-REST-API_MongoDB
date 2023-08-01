const { NotFoundError } = require("../../shared/errors");
const Admin = require("./_Admin");

const adminList = async ({
  q,
  filters = {},
  sort = { by: "_id", order: "asc" },
  page = { limit: 2, offset: 0 },
}) => {
  // SORT
  if (q) {
    filters = { full_name: { $regex: new RegExp(q, "i") } };
  }

  // FILTERS
  if (filters.is_deleted || filters.is_super) {
    filters["$or"] = [
      { is_deleted: filters.is_deleted },
      { is_super: filters.is_super },
    ];
  }

  const admin = Admin.find(filters).select("-is_super -is_deleted -password");
  //
  const totalPage = (await admin.clone()).length;
  //
  admin
    .sort({ [sort.by]: sort.order.toLocaleUpperCase() == "ASC" ? 1 : -1 })
    .skip(page.offset)
    .limit(page.limit);

  const result = await admin;

  if (!result.length) {
    throw new NotFoundError("Admins bo'sh");
  }

  return { list: result, pageInfo: { ...page, totalPage } };
};

module.exports = adminList;
