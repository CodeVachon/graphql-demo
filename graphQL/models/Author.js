const authorService = require("./../../services/authors");

class Author {
    constructor(id) {
        return authorService.getItem(id).then((record) => {
            for (let [key, value] of Object.entries(record)) {
                this[key] = value;
            }

            return this;
        });
    } // close constructor

    books() {
        const Book = require("./Book");

        return authorService.getBooksForAuthor(this.id).then(
            (recordSet) => Promise.all(recordSet.map(
                (record) => new Book(record.book_id)
            ))
        );
    } // close books
} // close Author

module.exports = Author;
