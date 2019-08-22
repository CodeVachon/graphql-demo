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

    static getList() {
        return tagsService.getList().then(
            (recordSet) => Promise.all(recordSet.map(
                (record) => new Tag(record.id)
            ))
        );
    } // close getList
} // close Tag

/*
 * EXAMPLE OF CALLING DATA FROM A RESTAPI
 */
// const PORT = process.env.PORT || 4000
// const axios = require("axios");
// class Tag {
//     constructor(id) {
//         return axios({
//             method: "GET",
//             url: `http://localhost:${PORT}/rest/tags/${id}`
//         }).then(response => response.data).then((record) => {
//             for (let [key, value] of Object.entries(record)) {
//                 this[key] = value;
//             }

//             return this;
//         });
//     } // close constructor

//     books() {
//         const Book = require("./Book");

//         return tagsService.getBooksForTag(this.id).then(
//             (recordSet) => Promise.all(recordSet.map(
//                 (record) => new Book(record.book_id)
//             ))
//         );
//     } // close books

//     static getList() {
//         return axios({
//             method: "GET",
//             url: `http://localhost:${PORT}/rest/tags`
//         }).then(response => response.data).then(
//             (recordSet) => Promise.all(recordSet.map(
//                 (record) => new Tag(record.id)
//             ))
//         );
//     } // close getList
// } // close Tag

module.exports = Tag;
