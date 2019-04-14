const express = require("express");
const router = express.Router();
const validator = require("../validator");
var multer = require("multer");
var path = require("path");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads");
  },
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});
var upload = multer({ storage: storage });

const getPostProperties = require("../controllers/post");
const createPostProperties = require("../controllers/post");
const createUserProperties = require("../controllers/auth");
const checkAuth = require("../middleware/check-auth");
const getUserProperties = require("../controllers/user");

// post
router.get("/", getPostProperties.getPost);
router.post(
  "/post",
  upload.single("photo"),
  validator.createPostValidator,
  createPostProperties.createPost
);

//auth
router.post(
  "/register",
  validator.userSignupValidator,
  createUserProperties.registerUser
);
router.post("/login", createUserProperties.loginUser);
router.get("/signout", createUserProperties.signoutUser);

//user
router.param("userId", getUserProperties.userById);
router.get("/users", getUserProperties.AllUsers);
router.get("/user/:_id", checkAuth, getUserProperties.SingleUser);
router.put("/edituser/:_id", checkAuth, getUserProperties.UpdateUser);
router.delete("/deleteuser/:_id", checkAuth, getUserProperties.DeleteUser);
module.exports = router;
