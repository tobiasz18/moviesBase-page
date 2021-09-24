const { roles } = require("../config/roles");

// /routes/api/users middleware
exports.grantAccess = function (action, resource) {
  return async (req, res, next) => {

    try {
      const permission = roles.can(req.user.role)[action](resource);
      //const permission = roles.can('admin').readOwn('profile');

      if (!permission.granted) {
        return res.status(400).json({
          error: "You have no promission"
        });
      }
      res.locals.permission = permission;
      next();
    } catch (error) {

      next();
    }
  }
}