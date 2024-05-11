const User = require("../model/auth");
const appError = require("../utility/appError");
const bcrypt = require("bcryptjs");

const register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
//   if (!isValidPassword(password)) {
//     return res
//       .status(400)
//       .send(
//         "Password must be at least 6 characters long and contain characters, numbers, and symbols"
//       );
//   }

  const oldUser = await User.findOne({ email: email });
  if (oldUser) {
    const error = appError.create("user is already exit", 400, "REGISTER FAIL");
    return next(error);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  await newUser.save();
  res
    .status(201)
    .json({ status: "SUCCESSFULLY REGISTERED!", data: { user: newUser } });
};

// function isValidPassword(password) {
//   return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(
//     password
//   );
// }

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = appError.create(
      "email or password are required",
      400,
      "fail"
    );
    return next(error);
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    const error = appError.create("email not found!", 400, "LOGIN FALI");
    return next(error);
  }

  const matchedPassword = await bcrypt.compare(password, user.password);
  if (matchedPassword) {
    res.status(200).json({ message: "Logged in successfully", token: token });
  } else {
    return res.status(400).json({ message: "Authentication failed" });
  }
};
module.exports = {
  register,
  login,
};
