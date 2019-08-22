const booksService = require("./../../services/books");

class Book {
    constructor(id) {
        return booksService.getItem(id).then((record) => {
            for (let [key, value] of Object.entries(record)) {
                this[key] = value;
            }

            return this;
        });
    } // close constructor

    authors() {
        const Author = require("./Author");

        return booksService.getAuthorsForBook(this.id).then(
            (recordSet) => Promise.all(recordSet.map(
                (record) => new Author(record.author_id)
            ))
        );
    } // close authors

    genras() {
        const Genra = require("./Genra");

        return booksService.getGenraForBook(this.id).then(
            (recordSet) => Promise.all(recordSet.map(
                (record) =>  new Genra(record.genra_id)
            ))
        );
    } // close genras

    tags() {
        const Tag = require("./Tag");

        return booksService.getTagsForBook(this.id).then(
            (recordSet) => Promise.all(recordSet.map(
                (record) => new Tag(record.tag_id)
            ))
        );
    } // close tags

    static getList() {
        return booksService.getList().then(
            (recordSet) => Promise.all(recordSet.map(
                (record) => new Book(record.id)
            ))
        );
    } // close getList
} // close Book

module.exports = Book;
