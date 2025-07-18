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

router.use(verifyJWT); 

router.post("/createnote", createNote);
router.get("/getmynotes", getMyNotes);
router.get("/:id", getNoteById);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);
router.get("/publicnotes", getPublicNotes); 

export default router;
