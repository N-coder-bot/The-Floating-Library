//acquiring Author model.
const Author = require("../models/Author");

//Display list of all authors.

exports.author_list = async (req, res) => {
  const list_of_authors = await Author.find({});
  res.json(list_of_authors);
  // console.log(list_of_authors);
};

//Display detail page for a specific author.
exports.author_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: Author detail: ${req.params.id}`);
};

//  Display Author create form on GET
exports.author_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Author create GET");
};

// Handle Author create on POST
exports.author_create_post = async (req, res) => {
  const response = await Author.create(req.body);
  // console.log(response);
  res.json({ data: response });
};

// Display Author delete form on GET.
exports.author_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Author delete GET");
};

// Handle Author delete on POST.
exports.author_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Author delete POST");
};

// Display Author update form on GET.
exports.author_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Author update GET");
};

// Handle Author update on POST.
exports.author_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Author update POST");
};
