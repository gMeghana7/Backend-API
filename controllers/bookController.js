import Book from "../models/Book.js";


export const createBook = async (req, res, next) => {
  try {
    const { title, author, genre, price } = req.body;

    if (!title || !author || !genre || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const book = await Book.create({
      title,
      author,
      genre,
      price,
      user: req.user.id,
    });

    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
};

export const getBooks = async (req, res, next) => {
  try {
    const books = await Book.find({ user: req.user.id });
    res.json(books);
  } catch (error) {
    next(error);
  }
};

export const getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (error) {
    next(error);
  }
};


export const updateBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) return res.status(404).json({ message: "Book not found" });
    if (book.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedBook);
  } catch (error) {
    next(error);
  }
};


export const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    if (book.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    await book.deleteOne();
    res.json({ message: "Book deleted" });
  } catch (error) {
    next(error);
  }
};
