const { NotFoundError } = require("../../shared/errors");
const Publishers = require("./_Publishers");

const showPublishers = async ({ id }) => {
  const publishers = await Publishers.findById(id);

  if (!publishers) {
    throw new NotFoundError("Publishers topilmadi.");
  }

  return publishers;
};

module.exports = showPublishers;
