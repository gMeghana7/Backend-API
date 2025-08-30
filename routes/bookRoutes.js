import express from "express";
import {
  getBooks,
  createBook,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/", getBooks);
router.get("/:id", getBookById);


router.post("/", protect, createBook);
router.put("/:id", protect, updateBook);
router.delete("/:id", protect, deleteBook);

export default router;
