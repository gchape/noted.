import express from "express";
import connectDB from "./config/db";
import dotenv from "dotenv";
import noteRoutes from "./routes/noteRoutes";
dotenv.config();

connectDB();

const app = express();

const host = process.env.HOST || "locahost";
const port = Number(process.env.PORT) || 3000;

app.use(express.json());

app.use("/api/notes", noteRoutes);

app.listen(port, host, 0, () => {
  console.log(`> Server running on ${host}:${port}`);
});

export default app;
