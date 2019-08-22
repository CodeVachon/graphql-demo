const Book = require("./models/Book");
const Author = require("./models/Author");
const Genra = require("./models/Genra");
const Tag = require("./models/Tag");

module.exports = {
    book: ({ id }) => new Book(id),
    books: () => Book.getList(),
    author: ({ id }) => new Author(id),
    authors: () => Author.getList(),
    genra: ({ id }) => new Genra(id),
    genras: () => Genra.getList(),
    tag: ({ id }) => new Tag(id),
    tags: () => Tag.getList()
};
