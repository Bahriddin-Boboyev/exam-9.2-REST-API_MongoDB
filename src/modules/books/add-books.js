const { BadRequestError } = require("../../shared/errors");
const Books = require("./_Books");

const addBooks = async (data) => {
  const existing = await Books.find({ title: data.title });

  if (existing.length) {
    const checkFilter = existing.filter(
      (item) => item.publisher.toString() == data.publisher
    );

    if (checkFilter.length) {
      throw new BadRequestError("Books allaqachon mavjud.");
    }
  }

  const result = await Books.create(data);
  const { is_deleted, ...rest } = result.toObject();

  return rest
};

module.exports = addBooks;
