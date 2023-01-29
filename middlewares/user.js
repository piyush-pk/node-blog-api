import User from "../models/user.js";

export const getUserById = async (req, res, next, id) => {
  try {
    const user = await User.findById(id);
    user.forgotPassworCode = undefined;
    user.password = undefined;
    user.createdAt = undefined;
    user.updatedAt = undefined;
    req.profile = user;
    next();
  } catch (err) {
    return res.json({ error: "Failed To get User !!!" });
  }
};
