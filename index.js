const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
require("dotenv").config();

const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(userRoutes);

try {
  mongoose.connect("mongodb://localhost:27017/bounteous");
  console.log("connected to db");
} catch (err) {
  console.log("unhandledRejection", err.message);
}

app.listen(process.env.PORT || 8080, () => console.log("Server is running"));

// const UserDetails = mongoose.model("UserDetails", {
//   name: String,
//   password: String,
// });

// const user = new UserDetails({
//   name: "Tauseef",
//   password: "12345678",
// });

// user.save().then(
//   () => console.log("One entry added"),
//   (err) => console.log(err)
// );

// app.get("/", (req, res) => {
//   res.json({ msg: "Server is On babyyyyyyyyyyyyyyy" });
// });
