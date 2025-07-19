import express from "express";
import {
  createNote,
  getMyNotes,
  getNoteById,
  getPublicNotes,
  updateNote,
  deleteNote
} from "../controllers/notes.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = express.Router();

// Public route (no auth needed)
router.get("/publicnotes", getPublicNotes); 

// Apply verifyJWT middleware to all routes AFTER this point
router.use(verifyJWT);  

// Protected routes (require auth)
router.post("/createnote", createNote);
router.get("/getmynotes", getMyNotes);
router.get("/:id", getNoteById);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
