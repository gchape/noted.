import express, { urlencoded } from "express";
import noteRoutes from "./routes/noteRoutes";
import userRoutes from "./routes/userRoutes";
import connectDB from "./config/db";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

connectDB();

const app = express();

const host = process.env.HOST!;
const port = Number(process.env.PORT)!;

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use("/api/notes", noteRoutes);
app.use("/api/users", userRoutes);

app.listen(port, host, 0, () => {
  console.log(`> Server running on ${host}:${port}`);
});

export default app;
