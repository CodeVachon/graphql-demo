const express = require("express");
const errorMessages = require("@christophervachon/error-messages");
const bookService = require("./../services/books");
const authorsService = require("./../services/authors");
const tagsService = require("./../services/tags");
const genrasService = require("./../services/genras");

module.exports = () => {
    const router = express.Router({
        caseSensitive: true
    });


    router.route("/books")
        .get((request, response, next) => {
            bookService.getList().then(recordSet => {
                response.json(recordSet);
            }).catch(next);
        })
    ;

    router.route("/books/:bookId")
        .get((request, response, next) => {
            bookService.getItem(request.params.bookId).then(recordSet => {
                response.json(recordSet);
            }).catch(next);
        })
    ;

    router.route("/books/:bookId/authors")
        .get((request, response, next) => {
            bookService.getAuthorsForBook(request.params.bookId).then(
                (recordSet) => Promise.all(recordSet.map(
                    (record) => authorsService.getItem(record.author_id)
                ))
            ).then((recordSet) => {
                response.json(recordSet);
            }).catch(next);
        })
    ;

    router.route("/books/:bookId/tags")
        .get((request, response, next) => {
            bookService.getTagsForBook(request.params.bookId).then(
                (recordSet) => Promise.all(recordSet.map(
                    (record) => tagsService.getItem(record.tag_id)
                ))
            ).then((recordSet) => {
                response.json(recordSet);
            }).catch(next);
        })
    ;

    router.route("/books/:bookId/genras")
        .get((request, response, next) => {
            bookService.getGenraForBook(request.params.bookId).then(
                (recordSet) => Promise.all(recordSet.map(
                    (record) => genrasService.getItem(record.genra_id)
                ))
            ).then((recordSet) => {
                response.json(recordSet);
            }).catch(next);
        })
    ;

    router.route("/authors")
        .get((request, response, next) => {
            authorsService.getList().then(recordSet => {
                response.json(recordSet);
            }).catch(next);
        })
    ;

    router.route("/authors/:authorId")
        .get((request, response, next) => {
            authorsService.getItem(request.params.authorId).then(recordSet => {
                response.json(recordSet);
            }).catch(next);
        })
    ;

    router.route("/authors/:authorId/books")
        .get((request, response, next) => {
            authorsService.getBooksForAuthor(request.params.authorId).then(
                (recordSet) => Promise.all(recordSet.map(
                    (record) => bookService.getItem(record.book_id)
                ))
            ).then((recordSet) => {
                response.json(recordSet);
            }).catch(next);
        })
    ;

    router.route("/tags")
        .get((request, response, next) => {
            tagsService.getList().then(recordSet => {
                response.json(recordSet);
            }).catch(next);
        })
    ;

    router.route("/tags/:tagId")
        .get((request, response, next) => {
            tagsService.getItem(request.params.tagId).then(recordSet => {
                response.json(recordSet);
            }).catch(next);
        })
    ;

    router.route("/tags/:tagId/books")
        .get((request, response, next) => {
            tagsService.getBooksForTag(request.params.tagId).then(
                (recordSet) => Promise.all(recordSet.map(
                    (record) => bookService.getItem(record.book_id)
                ))
            ).then((recordSet) => {
                response.json(recordSet);
            }).catch(next);
        })
    ;

    router.route("/genras")
        .get((request, response, next) => {
            genrasService.getList().then(recordSet => {
                response.json(recordSet);
            }).catch(next);
        })
    ;

    router.route("/genras/:genraId")
        .get((request, response, next) => {
            genrasService.getItem(request.params.genraId).then(recordSet => {
                response.json(recordSet);
            }).catch(next);
        })
    ;

    router.route("/genras/:genraId/books")
        .get((request, response, next) => {
            genrasService.getBooksForGenra(request.params.genraId).then(
                (recordSet) => Promise.all(recordSet.map(
                    (record) => bookService.getItem(record.book_id)
                ))
            ).then((recordSet) => {
                response.json(recordSet);
            }).catch(next);
        })
    ;

    router.route("*")
        .get((request, response) => {
            response.json(errorMessages.notFound());
        })
    ;

    return router;
};
