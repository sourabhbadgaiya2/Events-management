import User from "../models/user.models.js";
import ErrorHandlers from "../helpers/ErrorHandler.js";

export const registerUser = async ({ email, name, password }) => {
  const existUser = await User.findOne({ email: email });

  if (existUser) {
    throw new ErrorHandlers("User Already Exists", 500);
  }

  const hashPassword = await User.hashPassword(password);

  const newUser = new User({ email, password: hashPassword, name });
  const savedUser = newUser.save();

  savedUser.password = undefined;

  return savedUser;
};

export const loginUser = async ({ email, password }) => {
  const existUser = await User.findOne({ email: email }).select("+password");

  if (!existUser) {
    throw new ErrorHandlers("Email and password don't match", 500);
  }

  const isMatch = await existUser.comparePassword(password);

  if (!isMatch) {
    throw new ErrorHandlers("Email and password don't match", 500);
  }

  const token = await existUser.genAuthToken();

  return { existUser, token };
};
