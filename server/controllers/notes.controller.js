import { Note } from "../models/notes.models.js";
import { asyncHandler } from "../utils/Asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const createNote = asyncHandler(async (req, res) => {
    const { title, content, isPublic = false } = req.body;
    const userId = req.user._id;

    if (!title || !content) {
        throw new ApiError(400, "Title and content are required");
    }

    const note = await Note.create({ title, content, isPublic, user: userId });

    return res.status(201).json({
    success: true,
    message: "Note created successfully",
    note,}
    );
});


 const getMyNotes = asyncHandler(async (req, res) => {
    const notes = await Note.find({ user: req.user._id }).sort({ updatedAt: -1 });
    return res.status(200).json(new ApiResponse(200, notes));
});


 const getPublicNotes = asyncHandler(async (req, res) => {
    const notes = await Note.find({ isPublic: true }).sort({ updatedAt: -1 });
    return res.status(200).json(new ApiResponse(200, notes));
});


 const getNoteById = asyncHandler(async (req, res) => {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });

    if (!note) {
        throw new ApiError(404, "Note not found");
    }

    return res.status(200).json(new ApiResponse(200, note));
});


 const updateNote = asyncHandler(async (req, res) => {
    const { title, content, isPublic } = req.body;

    let note = await Note.findOne({ _id: req.params.id, user: req.user._id });

    if (!note) {
        throw new ApiError(404, "Note not found");
    }

    note.title = title ?? note.title;
    note.content = content ?? note.content;
    note.isPublic = isPublic ?? note.isPublic;

    await note.save();

    return res.status(200).json({
      success: true,
      message: "Note updated successfully",
      note, 
    });
});


 const deleteNote = asyncHandler(async (req, res) => {
    const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!note) {
        throw new ApiError(404, "Note not found");
    }

    return res.status(200).json(new ApiResponse(200, null, "Note deleted"));
});


export {createNote, getMyNotes, getPublicNotes, getNoteById, updateNote, deleteNote};
