const User = require("../models/user");
var bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const expressJwt = require("express-jwt");
const saltRounds = 10;

function registerUser(req, res) {
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash
    });
    user.save().then(result => {
      res.status(200).json({
        user: result
      });
    });
  });
}

function loginUser(req, res) {
  // find the user
  User.findOne(
    {
      name: req.body.name
    },
    function(err, user) {
      if (err) throw err;

      if (!user) {
        res.json({
          success: false,
          message: "Authentication failed. User not found."
        });
      } else if (user) {
        // check if password matches
        if (
          user.password !=
          bcrypt.compare(req.body.password, user.password, function(
            err,
            result
          ) {
            if (err) {
              res.json({
                success: false,
                message: "Authentication failed. Wrong password."
              });
            } else {
              if (result == true) {
                // if user is found and password is right
                // create a token with only our given payload
                // we don't want to pass in the entire user since that has the password
                const payload = {
                  admin: user.admin
                };
                // const expiresIn = 24 * 60 * 60;
                var token = jwt.sign(
                  { _id: user._id },
                  process.env.JSONWEBTOKEN
                );

                res.cookie("t", token, { expire: new Date() + 9999 });

                // return the information including token as JSON
                res.json({
                  success: true,
                  message: "Login Successfull",
                  token: token,
                  result: user
                });
              } else {
                res.json({
                  success: false,
                  message: "Authentication failed. Wrong password."
                });
              }
            }
          })
        ) {
        }
      }
    }
  );
}

function signoutUser(req, res) {
  res.clearCookie("t");
  return res.json({ message: "Signout Success" });
}

// function requireSignin() {
//   expressJwt({
//     secret: process.env.JSONWEBTOKEN,
//     userProperty: "auth"
//   });
// }

module.exports = {
  registerUser: registerUser,
  loginUser: loginUser,
  signoutUser: signoutUser
};
