import jwt from "jsonwebtoken";

export const isSingedIn = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ error: "Please Login First !!!" });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded; 
    next();
  } catch {
    return res.json({ error: "invalid token!!!" });
  }
};

export const isAunthenticated = (req, res, next) => {
  let checker = req.user && req.profile && req.profile._id == req.user.id;
  if (!checker) {
    return res.json({
      error: "You are not authenticated person, ACCESS DENIED !!!",
    });
  }
  next();
};

export const isAdmin = (req, res, next) => {
  if (!req.profile.isAdmin) {
    return res.json({ error: "You are not admin. ACCESS DENIED !!!" });
  }
  next();
};
