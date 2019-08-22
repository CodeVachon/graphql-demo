const booksService = require("./../services/books");
const authorService = require("./../services/authors");
const genrasService = require("./../services/genras");
const tagsService = require("./../services/tags");
const Book = require("./models/Book");
const Author = require("./models/Author");
const Genra = require("./models/Genra");
const Tag = require("./models/Tag");

module.exports = {
    book: ({ id }) => new Book(id),
    books: () => booksService.getList().then(
        (recordSet) => Promise.all(recordSet.map(
            (record) => new Book(record.id)
        ))
    ),
    author: ({ id }) => new Author(id),
    authors: () => authorService.getList().then(
        (recordSet) => Promise.all(recordSet.map(
            (record) => new Author(record.id)
        ))
    ),
    genra: ({ id }) => new Genra(id),
    genras: () => genrasService.getList().then(
        (recordSet) => Promise.all(recordSet.map(
            (record) => new Genra(record.id)
        ))
    ),
    tag: ({ id }) => new Tag(id),
    tags: () => tagsService.getList().then(
        (recordSet) => Promise.all(recordSet.map(
            (record) => new Tag(record.id)
        ))
    )
};

// --------------------------------------------------
// --- We can also make an API call
// --------------------------------------------------
// const PORT = require("./../package.json").nodemonConfig.env.PORT;
// const axios = require("axios");
//
// tag: ({ id }) => axios({
//     method: "GET",
//     url: `http://localhost:${PORT}/rest/tags/${id}`
// }).then(response => response.data),
// tags: () => axios({
//     method: "GET",
//     url: `http://localhost:${PORT}/rest/tags`
// }).then(response => response.data)
//