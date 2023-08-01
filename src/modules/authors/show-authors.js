const { NotFoundError } = require("../../shared/errors");
const Authors = require("./_Authors");

const showAuthors = async ({ id }) => {
  const authors = await Authors.findById(id);

  if (!authors) {
    throw new NotFoundError("Authors topilmadi.");
  }

  return authors;
};

module.exports = showAuthors;
