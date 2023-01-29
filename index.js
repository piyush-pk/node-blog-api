import express from "express";
const app = express();
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from 'cors';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { userRouter } from "./router/user.js";
import { postRouter } from "./router/post.js";
import { isSingedIn } from "./middlewares/auth.js";
import multer from "multer";

// config multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
  },
});
const upload = multer({ storage: storage });

// config
dotenv.config();
const port = process.env.PORT || 8080;

// DB connection
mongoose.connect("mongodb://127.0.0.1:27017/Blog").then(() => {
  console.log("DB CONNECTED 🔥👍👍🤞");
});

// middleware
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({credentials: true, origin: 'http://localhost:4200'}));
app.use(upload.any());

// routers
app.use("/api/user", userRouter);
app.use(isSingedIn);
app.use("/api/post", postRouter);

app.get("/", (req, res) => {
  res.json({ hello: "world!!" });
});

app.listen(port, () => {
  console.log(`Server running on port http://127.0.0.1:${port} 🔥`);
});
