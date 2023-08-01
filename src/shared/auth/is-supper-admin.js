const { ForbiddenError } = require("../errors");

const hasRole = (req, res, next) => {
  const { superAdmin } = req.user;
  if (!superAdmin) {
    throw new ForbiddenError("This road is forbidden");
  }
};
module.exports = hasRole;
