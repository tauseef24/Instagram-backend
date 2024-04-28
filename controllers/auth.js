var jwt = require("jsonwebtoken");
const argon2 = require("argon2");

var User = require("../models/user");

exports.signup = async (req, res) => {
  const password = await argon2.hash(req.body.password);
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: password,
  });

  try {
    await user.save();
    res.status(200).send({ message: "User Registered Successfully" });
  } catch (err) {
    res.status(500).send({ message: err });
    return;
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }
    var passwordIsValid = await argon2.verify(user.password, req.body.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password",
      });
    }

    var token = jwt.sign(
      {
        id: user.id,
      },
      process.env.API_SECRET,
      {
        expiresIn: 86400,
      }
    );

    res.status(200).send({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
      message: "Login Successfull",
      accessToken: token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err,
    });
    return;
  }
};
