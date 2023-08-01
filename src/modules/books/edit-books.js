const { NotFoundError, BadRequestError } = require("../../shared/errors");
const Books = require("./_Books");

const editBooks = async ({ id, ...changes }) => {
  const existing = await Books.findOne({ _id: id, is_deleted: false });

  if (!existing) {
    throw new NotFoundError("Books topilmadi.");
  }

  if (changes.publisher || changes.title) {
    const { publisher, title } = Object.assign({}, existing, changes);

    if (title) {
      const existingTitle = await Books.find({
        title,
        publisher: existing.publisher,
      });

      if (existingTitle.length) {
        throw new BadRequestError("Books allaqachon mavjud.");
      }
    }

    if (publisher) {
      const existingPublisher = await Books.find({
        publisher,
        title: existing.title,
      });

      if (existingPublisher.length) {
        throw new BadRequestError("Books allaqachon mavjud.");
      }
    }
  }

  return Books.findByIdAndUpdate(id, changes, { new: true }).select('-is_deleted');
};

module.exports = editBooks;
