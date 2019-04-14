var _ = require("lodash");
const User = require("../models/user");
function userById(req, res, next, id) {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found"
      });
    }

    req.profile = user; // adds profile object in req with user info
    next();
  });
}

function hasAuthorization(req, res, next) {
  const authorised =
    req.profile && req.auth && req.profile._id === req.auth._id;
  if (!authorised) {
    return res.status(403).json({
      error: "User is not authorised to perform this action"
    });
  }
}

function AllUsers(req, res, next) {
  User.find((err, users) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    res.json({ users });
  }).select("name , email , password ,  created");
}

function SingleUser(req, res) {
  console.log("details");
  User.findById({ _id: req.params._id }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User Not Found"
      });
    }
    console.log("details", req.profile);
    res.json({ user });
  }).select("_id, name , email ,  created");
}

function UpdateUser(req, res) {
  User.findById({ _id: req.params._id }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: err
      });
    }

    user = _.extend(user, req.body);
    user.updated = Date.now();
    user.save(err => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorised to perform this action "
        });
      }
      res.json({ user });
    });
  });
}

function DeleteUser(req, res) {
  User.findByIdAndRemove({ _id: req.params._id }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: err
      });
    }
    console.log("details", req.profile);
    res.json({ msg: "Successfully Deleted" });
  });
}

module.exports = {
  userById: userById,
  hasAuthorization: hasAuthorization,
  AllUsers: AllUsers,
  SingleUser: SingleUser,
  UpdateUser: UpdateUser,
  DeleteUser: DeleteUser
};
