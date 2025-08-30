import Book from "../models/Book.js";

export const getBooks = async (req, res) => {
  const books = await Book.find();
  res.json(books);
};


export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (error) {
    res.status(400).json({ message: "Invalid book ID" });
  }
};

export const createBook = async (req, res) => {
  try {
    const { title, author, description, publishedYear } = req.body;

    const book = await Book.create({
      title,
      author,
      description,
      publishedYear,
      user: req.user._id
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await book.deleteOne();
    res.json({ message: "Book removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
