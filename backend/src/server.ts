import express, { urlencoded } from "express";
import noteRoutes from "./routes/noteRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

connectDB();

const app = express();

const host = process.env.HOST!;
const port = Number(process.env.PORT)!;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

app.use("/api/notes", noteRoutes);
app.use("/api/users", userRoutes);

app.listen(port, host, 0, () => {
  console.log(`> Server running on ${host}:${port}`);
});

export default app;
