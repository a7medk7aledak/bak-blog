import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  console.log(req.body)
  const { username, email, password } = req.body;
// to make extra Security to check if all flied is is have value
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    // to handel errors
    next(errorHandler(400, "All fields are required"));
  }
//to make password hashed in database 
  const hashedPassword = bcryptjs.hashSync(password, 10);//10 the number os element that add to make password hashed
// pass information to data base
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  // try and catch to send error for user is that username have already to data base
  try {
    //to save user to data base
    await newUser.save();
    res.json("Signup successful");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  //check if have error
  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }
  // we use "User not found" to Misleading the hacker not tell him email or password which one is not correct
  try {
    //check if that email in database or not
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    //method compareSync to check password
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid password"));
    }
    //jwt to make auth and make cookie
    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET
    );

    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

// export const google = async (req, res, next) => {
//   const { email, name, googlePhotoUrl } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (user) {
//       const token = jwt.sign(
//         { id: user._id, isAdmin: user.isAdmin },
//         process.env.JWT_SECRET
//       );
//       const { password, ...rest } = user._doc;
//       res
//         .status(200)
//         .cookie("access_token", token, {
//           httpOnly: true,
//         })
//         .json(rest);
//     } else {
//       const generatedPassword =
//         Math.random().toString(36).slice(-8) +
//         Math.random().toString(36).slice(-8);
//       const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
//       const newUser = new User({
//         username:
//           name.toLowerCase().split(" ").join("") +
//           Math.random().toString(9).slice(-4),
//         email,
//         password: hashedPassword,
//         profilePicture: googlePhotoUrl,
//       });
//       await newUser.save();
//       const token = jwt.sign(
//         { id: newUser._id, isAdmin: newUser.isAdmin },
//         process.env.JWT_SECRET
//       );
//       const { password, ...rest } = newUser._doc;
//       res
//         .status(200)
//         .cookie("access_token", token, {
//           httpOnly: true,
//         })
//         .json(rest);
//     }
//   } catch (error) {
//     next(error);
//   }
// };
