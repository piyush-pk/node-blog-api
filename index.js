import express from "express";
const app = express();
import dotenv from "dotenv";

// config
dotenv.config();
const port = process.env.PORT || 8080;

// middleware

// routers


app.get("/", (req, res) => {
  res.json({ hello: "world!!" });
});

app.listen(port, () => {
  console.log(`Server running on port http://127.0.0.1:${port} 🔥`);
});
