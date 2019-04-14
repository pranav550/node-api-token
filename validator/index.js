function createPostValidator(req, res, next) {
  req.check("title", "title is required").notEmpty();
  req.check("title", "title must be b/w 4 to 20").isLength({
    min: 4,
    max: 20
  });
  req.check("body", "body is required").notEmpty();
  req.check("body", "body must be b/w 4 to 100").isLength({
    min: 4,
    max: 100
  });
  console.log("check1");
  const errors = req.validationErrors();
  // if error show the first one as they happen
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }

  next();
}

function userSignupValidator(req, res, next) {
  req.check("name", "Name is required").notEmpty();
  req.check("name", "name must be b/w 4 to 20").isLength({
    min: 4,
    max: 20
  });
  req.check("email", "email is required").notEmpty();
  req.check("email", "email is not valid").isEmail();

  req.check("password", "password is required").notEmpty();
  req.check("password", "minimum length of password must be 6").isLength({
    min: 6
  });
  req.check("password", "password is only numeric").isNumeric();

  const errors = req.validationErrors();
  // if error show the first one as they happen
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  // proceed to next middleware
  next();
}

module.exports = {
  createPostValidator: createPostValidator,
  userSignupValidator: userSignupValidator
};
