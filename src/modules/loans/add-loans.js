const { BadRequestError } = require("../../shared/errors");
const Loans = require("./_Loans");
const Books = require("../books/_Books");

const addLoans = async ({ admin, data }) => {
  const existing = await Loans.findOne({
    book: data.book,
    borrower: data.borrower,
  });

  if (existing) {
    throw new BadRequestError("Loans allaqachon mavjud.");
  }

  if (data.borrower) {
    const borrower = await Loans.find({ borrower: data.borrower });

    for (let i = 0; i < borrower.length; i++) {
      console.log(borrower[i].out_date, borrower[i].due_date);
      if (borrower[i].out_date > borrower[i].due_date) {
        const book = await Books.findById(borrower[i].book);
        throw new BadRequestError(
          `Kechirasiz sizga kitob ijaraga berish taqiqlangan, Sababi siz '${book.title}' kitobni o'z vaqtida topshirmagansiz!`
        );
      }
    }

    if (borrower.length > 10) {
      throw new BadRequestError(
        "Kechirasiz siz maksimal kitob ijaraga olgansiz!"
      );
    }
  }

  if (data.due_date <= 0) {
    throw new BadRequestError(
      "Kechirasiz ijara muddati manfiy yoki 0 bo'lmaydi!"
    );
  }

  if (data.due_date > 60) {
    throw new BadRequestError("Kechirasiz ijara muddati maksimal 60 kungacha!");
  }
  //
  const books = await Books.findById(data.book);
  await Books.findByIdAndUpdate(data.book, {
    copies: books.copies - 1,
  });
  //
  const due_date = new Date(+new Date() + data.due_date * 24 * 60 * 60 * 1000);

  const chunk = { admin: admin.id, due_date };
  const result = await Loans.create({ ...data, ...chunk });
  result.save();

  return "Ijara muaffaqiyatli qo'shildi!";
};

module.exports = addLoans;
