const { NotFoundError } = require("../../shared/errors");
const Loans = require("./_Loans");

const showLoans = async ({ id }) => {
  const loans = await Loans.findById(id).populate([
    {
      path: "book",
      select: "-is_deleted -publisher -author -copies",
    },
    {
      path: "admin",
      select: "-is_deleted -is_super -password",
    },
    {
      path: "borrower",
      select: "-is_deleted",
    },
  ]);

  if (!loans) {
    throw new NotFoundError("Loans topilmadi.");
  }

  return loans;
};

module.exports = showLoans;
