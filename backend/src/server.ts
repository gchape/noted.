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

const port = Number(process.env.PORT) || 10000;

app.listen(port, () => {
  console.log(`> Server running on port ${port}`);
});

export default app;
