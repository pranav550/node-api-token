const Post = require("../models/post");
const User = require("../models/user");
function getPost(req, res) {
  const posts = Post.find()
    .select("_id title body")
    .then(posts => {
      res.status(200).json({
        post: posts
      });
    })
    .catch(err => console.log(err));
}
function createPost(req, res) {
  const file = req.file;
  if (!file) {
    res.status(400).json({ msg: "Please Upload a file" });
    return false;
  }
  let newDomain = new Post({
    title: req.body.title,
    body: req.body.body,
    photo: file.path
  });
  console.log(newDomain);
  newDomain.save((err, result) => {
    if (err) {
      res.json(err);
    } else {
      console.log("hihii");

      var mergedObj = { ...file, ...result._doc };
      res.send(mergedObj);
    }
  });
}
module.exports = {
  getPost: getPost,
  createPost: createPost
};
