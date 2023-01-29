import { isEmpty } from "./functions.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import User from "../models/user.js";

export const register = async (req, res) => {
  if (isEmpty(req.body)) {
    return res.json({ error: "Please Full Details!!!" });
  }
  let { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    let uuid = uuidv4();
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        const user = new User({
          name,
          email,
          password: hash,
          forgotPassworCode: uuid,
        })
          .save()
          .then((user) => {
            const { password, hash, forgotPassworCode, ...details } = user._doc;
            return res.json({ success: 'Registration Succssful.',details});
          })
          .catch((err) => {
            return res.json({ error: err.message });
          });
      });
    });
  } else if (user) {
    res.json({ error: "user is already registered !!!" });
    return;
  }
};

export const login = async (req, res) => {
  if (isEmpty(req.body)) {
    return res.json({ error: "Please Full Details!!!" });
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: `No user registered with this email` });
  } else if (user) {
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        const token = jwt.sign(
          { id: user._id, isAdmin: user.isAdmin },
          process.env.SECRET,
          { expiresIn: "2h" },
          { algorithm: "RS256" }
        );
        return res.cookie("token", token, {httpOnly: true, secure: true, sameSite: 'none'}).json({ success: `user login successfully`, token, id: user._id });
      }
      return res.json({ error: "Password is incorrect, Please try again !!!" });
    });
  }
};

export const profile = (req, res) => {
  return res.json(req.profile);
};

export const updateUser = (req, res) => {
  User.findByIdAndUpdate(
    req.profile._id,
    {
      name: req.body.name,
      email: req.body.email,
      website: req.body.website,
    },
    { new: true, useFindAndModify: false },
    (err, result) => {
      if (err || !result) {
        return res.json({ error: "Unable To update details.." });
      }
      res.json({success: 'Profile Updated.', result});
    }
  );
};

export const logout = (req, res) => {
  // res.clearCookie("token");
  res.cookie("token", null, {httpOnly: true, secure: true, sameSite: 'none'})
  res.json({ success: "Logout Successfully." });
};
