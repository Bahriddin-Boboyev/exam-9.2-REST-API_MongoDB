const { NotFoundError } = require("../../shared/errors");
const Loans = require("./_Loans");

const listLoans = async ({
  filters = {},
  sort = { by: "_id", order: "asc" },
  page = { limit: 3, offset: 0 },
}) => {
  // FILTERS
  if (filters.out_date || filters.due_date) {
    filters["$or"] = [
      { out_date: filters.out_date },
      { due_date: filters.due_date },
    ];
  }
  const loans = Loans.find(filters)
    .populate([
      {
        path: "book",
        select: "-is_deleted -publisher -author",
      },
      {
        path: "admin",
        select: "-is_deleted -is_super -password",
      },
      {
        path: "borrower",
        select: "-is_deleted",
      },
    ])
    .select("-is_deleted");
  //
  const totalPage = (await loans.clone()).length;
  //
  loans
    .sort({ [sort.by]: sort.order.toLocaleUpperCase() == "ASC" ? 1 : -1 })
    .skip(page.offset)
    .limit(page.limit);

  const result = await loans;

  if (!result.length) {
    throw new NotFoundError("Loans bo'sh");
  }

  return { list: result, pageInfo: { ...page, totalPage } };
};

module.exports = listLoans;
