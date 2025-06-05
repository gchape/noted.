import { Router } from "express";
import asyncHandler from "../middleware/asyncHandler";
import Note from "../models/noteModel";

const router = Router();

// Get all notes
router.get(
  "/",
  asyncHandler(async (_, resp) => {
    const notes = await Note.find({});
    return resp.json(notes);
  })
);

// Get single note by ID
router.get(
  "/:id",
  asyncHandler(async (req, resp) => {
    const id = req.params.id;
    const note = await Note.findById(id);

    if (note) {
      return resp.json(note);
    }

    resp.status(404).json({ message: "Note not found" });
  })
);

// Create a new note
router.post(
  "/",
  asyncHandler(async (req, resp) => {
    const { title, content, url, tags, favourite, user } = req.body;

    if (!title || !content || !user) {
      return resp
        .status(400)
        .json({ message: "Title, content, and user are required." });
    }

    const newNote = await Note.create({
      title,
      content,
      url,
      tags: tags || [],
      favourite: favourite || false,
      user,
    });

    return resp.status(201).json(newNote);
  })
);

// Update an existing note
router.put(
  "/:id",
  asyncHandler(async (req, resp) => {
    const { title, content, url, tags, favourite } = req.body;
    const note = await Note.findById(req.params.id);

    if (!note) {
      return resp.status(404).json({ message: "Note not found" });
    }

    note.title = title ?? note.title;
    note.content = content ?? note.content;
    note.url = url ?? note.url;
    note.tags = tags ?? note.tags;
    note.favourite =
      typeof favourite === "boolean" ? favourite : note.favourite;

    const updatedNote = await note.save();
    return resp.json(updatedNote);
  })
);

// Delete a note
router.delete(
  "/:id",
  asyncHandler(async (req, resp) => {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return resp.status(404).json({ message: "Note not found" });
    }

    await note.deleteOne();
    return resp.json({ message: "Note deleted" });
  })
);

router.get(
  "/search",
  asyncHandler(async (req, resp) => {
    const { query, tag, favourite } = req.query;

    // Build dynamic filter
    const filters: any = {};

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
