import express, { urlencoded } from "express";
import connectDB from "./config/db";
import dotenv from "dotenv";
import noteRoutes from "./routes/noteRoutes";
import userRoutes from "./routes/userRoutes";
dotenv.config();

connectDB();

const app = express();

const host = process.env.HOST || "locahost";
const port = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use("/api/notes", noteRoutes);
app.use("/api/users", userRoutes);

app.listen(port, host, 0, () => {
  console.log(`> Server running on ${host}:${port}`);
});

export default app;
