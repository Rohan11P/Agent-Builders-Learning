import express from "express";
import dotenv from "dotenv";
import { connect } from "mongoose";
import cookieParser from "cookie-parser";
import connectDb from "./config/ConnectDB.js";
import authRouter from "./route/authRoute.js";
import cors from "cors"
import userRouter from "./route/userRoute.js";
import courseRouter from "./route/courseRoute.js";
dotenv.config();

const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.get("/", (_req, res) => {
  res.send("Hello From AgentBuliders Server");
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// app.options("*", cors());
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/course", courseRouter)
app.listen(port, () => {
  console.log("Server Started", port);
  connectDb();
});
