import { Router } from "express";
import { getNotes } from "../controllers/noteController";

const noteRoutes = Router();

noteRoutes.get("/", getNotes);

export default noteRoutes;
