const express = require("express");
const morgan = require("morgan");
const expressValidator = require("express-validator");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("DB Connected"));

mongoose.connection.on("error", err => {
  console.log(`DB Connection Error: ${err.message}`);
});
const app = express();
const postRoutes = require("./routes/post");
const port = process.env.PORT || 3000;

// const myOwnMiddleware = (req, res, next) => {
//   console.log("applied middeware");
//   next();
// };

// app.use(function(req, res, next) {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     jwt.verify(token, key.tokenKey, function(err, payload) {
//       console.log(payload);
//       if (payload) {
//         user.findById(payload.userId).then(doc => {
//           req.user = doc;
//           next();
//         });
//       } else {
//         next();
//       }
//     });
//   } catch (e) {
//     next();
//   }
// });

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cookieParser());
// app.use(myOwnMiddleware);

//routes
app.use("/", postRoutes);

app.use(function(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: "Unauthorised" });
  }
});

app.listen(port, () => {
  console.log("server started");
});
