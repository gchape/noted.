import { Router } from "express";
import asyncHandler from "../middleware/asyncHandler";
import Note from "../models/noteModel";
import { protect } from "../middleware/authMiddleware";

const router = Router();

// Get all notes for authenticated user
router.get(
  "/",
  protect,
  asyncHandler(async (req, resp) => {
    const notes = await Note.find({ user: req.userId });
    return resp.json(notes);
  })
);

// Get single note by ID (only if belongs to user)
router.get(
  "/:id",
  protect,
  asyncHandler(async (req, resp) => {
    const note = await Note.findOne({ _id: req.params.id, user: req.userId });

    if (!note) {
      return resp.status(404).json({ message: "Note not found" });
    }

    return resp.json(note);
  })
);

// Create a new note (assign user from token)
router.post(
  "/",
  protect,
  asyncHandler(async (req, resp) => {
    const { title, content, url, tags, favourite } = req.body;

    if (!title || !content) {
      return resp
        .status(400)
        .json({ message: "Title and content are required." });
    }

    const newNote = await Note.create({
      title,
      content,
      url,
      tags: tags || [],
      favourite: favourite || false,
      user: req.userId,
    });

    return resp.status(201).json(newNote);
  })
);

// Delete note (only if owned by user)
router.delete(
  "/:id",
  protect,
  asyncHandler(async (req, resp) => {
    const note = await Note.findOne({ _id: req.params.id, user: req.userId });

    if (!note) {
      return resp.status(404).json({ message: "Note not found" });
    }

    await note.deleteOne();

    return resp.json({ message: "Note deleted" });
  })
);

// Search notes belonging to user
router.get(
  "/search",
  protect,
  asyncHandler(async (req, resp) => {
    const { query, tag, favourite } = req.query;

    const filters: any = { user: req.userId };

    if (query) {
      filters.$or = [
        { title: { $regex: query as string, $options: "i" } },
        { content: { $regex: query as string, $options: "i" } },
      ];
    }

    if (tag) {
      filters.tags = { $regex: tag as string, $options: "i" };
    }

    if (favourite === "true") {
      filters.favourite = true;
    } else if (favourite === "false") {
      filters.favourite = false;
    }

    const notes = await Note.find(filters);

    return resp.json(notes);
  })
);

export default router;
