import express from "express";
import connectDB from "./db/connection.js";
import cookieParser from "cookie-parser";
import postRouter from "./routes/post.route.js";
import userRouter from "./routes/user.route.js"
import cors from "cors";

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(cookieParser());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use("/api/v1/post", postRouter)
app.use("/api/v1/user", userRouter)

app.get("/", (req, res) => {
  res.send("hello from server!")
})

connectDB(process.env.MONGODB_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`server is listening on port ${process.env.PORT}`);
    })
  }).catch(err => {
    console.log(err);
  })