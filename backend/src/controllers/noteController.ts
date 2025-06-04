import type { Request, Response } from "express";

const getNotes = (_: Request, res: Response): void => {
  try {
    res.json({ message: "Here are your notes" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch notes",
    });
  }
};

export { getNotes };
