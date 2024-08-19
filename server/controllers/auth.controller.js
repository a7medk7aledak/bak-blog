import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// Signup controller
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  // Check if all fields are filled
  if (!username || !email || !password) {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    // Hash the password before saving
    const hashedPassword = bcryptjs.hashSync(password, 10); // 10 is the salt rounds for bcrypt
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();
    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    // Handle duplicate key error (e.g., email or username already exists)
    if (error.code === 11000) {
      return next(errorHandler(400, "Email or username already exists"));
    }
    next(error);
  }
};

// Signin controller
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  // Check if all fields are filled
  if (!email || !password) {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    // Check if the user exists
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found")); // Misleading error to avoid giving away which field is incorrect
    }

    // Compare the password with the hashed password in the database
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid password")); // Misleading error
    }

    // Generate JWT token for authentication
    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const { password: pass, ...rest } = validUser._doc;

    // Set the token in a cookie and return the user details (excluding the password)
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "strict",
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

// Google Sign-In controller
export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      // If user does not exist, create a new one with a randomly generated password
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      user = new User({
        username: `${name.toLowerCase().replace(/\s+/g, "")}${Math.random()
          .toString(9)
          .slice(-4)}`, // Generate a unique username
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });

      // Save the new user to the database
      await user.save();
    }

    // Generate JWT token for authentication
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const { password, ...rest } = user._doc;

    // Set the token in a cookie and return the user details (excluding the password)
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "strict",
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
