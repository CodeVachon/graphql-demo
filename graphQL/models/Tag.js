const tagsService = require("./../../services/tags");

class Tag {
    constructor(id) {
        return tagsService.getItem(id).then((record) => {
            for (let [key, value] of Object.entries(record)) {
                this[key] = value;
            }

            return this;
        });
    } // close constructor

    books() {
        const Book = require("./Book");

        return tagsService.getBooksForTag(this.id).then(
            (recordSet) => Promise.all(recordSet.map(
                (record) => new Book(record.book_id)
            ))
        );
    } // close books
} // close Tag

module.exports = Tag;
