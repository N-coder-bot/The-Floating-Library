const Book = require("../models/book");
const Author = require("../models/author");
const Genre = require("../models/genre");
const User = require("../models/User");
exports.index = (req, res) => {
  res.send("NOT IMPLEMENTED: Site Home Page");
};

// Display list of all books.
exports.book_list = async function (req, res, next) {
  const books = await Book.find({}, "title author genre")
    .sort({ title: 1 })
    .populate("author")
    .populate("genre");
  if (!books) res.status(404).json({ err: "no books" });
  else res.json({ books });
};

// Display detail page for a specific book.
exports.book_detail = (req, res) => {
  Book.findById(req.params.id).exec(function (err, book) {
    if (err) {
      res.json(err);
    }
    res.json(book);
    // console.log(book);
  });
  // res.send(`NOT IMPLEMENTED: Book detail: ${req.params.id}`);
};

// Display book create form on GET.
exports.book_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Book create GET");
};

// Handle book create on POST.
exports.book_create_post = async (req, res) => {
  const data = req.body;
  const user = req.user;
  // console.log(req.user);
  const book = await Book.create({ ...data, user: user._id });
  user.books.push(book);
  await User.findByIdAndUpdate(user._id, { books: user.books });
  //forgot to put await above and cost a good amount of time. :(
  // console.log(user);
  res.json(book);
};

// Display book delete form on GET.
exports.book_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Book delete GET");
};

// Handle book delete on POST.
exports.book_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Book delete POST");
};

// Display book update form on GET.
exports.book_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Book update GET");
};

// Handle book update on POST.
exports.book_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Book update POST");
};
