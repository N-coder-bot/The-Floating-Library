const Book = require("../models/Book");
const Author = require("../models/Author");
const Genre = require("../models/Genre");
const User = require("../models/User");

//1. --- Display list of all books ---
exports.book_list = async function (req, res, next) {
  const books = await Book.find({});
  res.json({ books });
};

//2. --- Display detail page for a specific book ---
exports.book_detail = (req, res) => {
  Book.findById(req.params.id).exec(function (err, book) {
    if (err) {
      res.json(err);
    }
    res.json(book);
    // console.log(book);
  });
};

//3. --- Create a new Book ---
exports.book_create_post = async (req, res) => {
  const data = req.body;
  const user = req.user;
  const book = await Book.create({ ...data, user: user._id });

  // Push new book into user's "books" array.
  user.books.push(book);

  // Forgot to put await above and cost a good amount of time. :(
  await User.findByIdAndUpdate(user._id, { books: user.books });

  res.json(book);
};

//4. --- Delete a book with given ID ---
exports.book_delete = async (req, res) => {
  const bookId = req.params.id;
  const userId = req.user._id;

  try {
    // Remove the book from the user's 'books' array.
    await User.findByIdAndUpdate(userId, { $pull: { books: bookId } });

    // Find the author associated with the book.
    const book = await Book.findById(bookId).populate("author");
    const authorId = book.author._id;

    // Remove the book from the author's 'book' array.
    await Author.findByIdAndUpdate(authorId, { $pull: { book: bookId } });

    // Delete the book from the Book collection.
    await Book.findByIdAndDelete(bookId);

    res.status(200).json({ message: "Book deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the book." });
  }
};
