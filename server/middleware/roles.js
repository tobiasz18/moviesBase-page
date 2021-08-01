const { roles } = require("../config/roles");


exports.grantAccess = function (action, resource) {
  return async (req, res, next) => {
     try {
      const premission = roles.can(req.user.role)[action](resource);
      if(!premission.granted) {
        return res.status(400).json({
          error: "You have no promission"
        });
      }
      next();
     } catch(error) {
      next();
     }
  }
}