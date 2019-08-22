const genrasService = require("./../../services/genras");

class Genra {
    constructor(id) {
        return genrasService.getItem(id).then((record) => {
            for (let [key, value] of Object.entries(record)) {
                this[key] = value;
            }

            return this;
        });
    } // close constructor

    books() {
        const Book = require("./Book");

        return genrasService.getBooksForGenra(this.id).then(
            (recordSet) => Promise.all(recordSet.map(
                (record) => new Book(record.book_id)
            ))
        );
    } // close books

    static getList() {
        return genrasService.getList().then(
            (recordSet) => Promise.all(recordSet.map(
                (record) => new Genra(record.id)
            ))
        );
    } // close getList
} // close Genra

module.exports = Genra;
