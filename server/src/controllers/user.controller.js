import User from "../models/user.models.js";

export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ data: user, message: "User fetched successfully" });
  } catch (error) {
    next(error);
  }
};

export const getAllUser = async (req, res, next) => {
  try {
    const user = await User.find().sort({ createdAt: -1 });

    res.status(200).json({ data: user, message: "User fetched successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    //  empty updates
    if (!Object.keys(req.body).length) {
      return res
        .status(400)
        .json({ success: false, message: "No fields to update" });
    }

    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};
