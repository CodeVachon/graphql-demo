const shortid = require("shortid");
const extend = require("extend");
const knex = require("./knex");
const getItemId = require("./getItemId");


const updateLastUpdatedForBook = (book) => {
    const bookId = getItemId(book);

    return knex("books").update({
        updated: new Date()
    }).where("id", bookId);
}; // close updateLastUpdatedForBook

const bookService = {
    getList: (where, pageNo) => {
        if (!pageNo) {
            pageNo = 1;
        }
        const itemsPerPage = 10;
        const offset = ((pageNo - 1) * itemsPerPage);

        return knex("books").select("*").where(extend({
            isDeleted: 0
        }, where)).limit(itemsPerPage).offset(offset);
    },
    getCount: (where) => {
        return knex("books").count("id as count").where(extend({
            isDeleted: 0
        }, where)).then(recordSet => recordSet[0].count);
    },
    getItem: (id) => {
        return knex("books").first("*").where({
            id: id,
            isDeleted: 0
        });
    },
    createItem: (data) => {
        const record = extend(false, {
            id: shortid.generate(),
            title: "",
            deck: "",
            language: "",
            coverImage: "",
            publishDate: ""
        }, data);

        return knex("books").insert(record).then(() => {
            return bookService.getItem(record.id);
        });
    },
    editItem: (id, data) => {
        data.updated = new Date();

        return knex("books").update(data).where({
            id: id
        }).then(() => {
            return bookService.getItem(id);
        });
    },
    deleteItem: (id) => {
        return knex("books").update({
            isDeleted: true
        }).where({
            id: id
        }).then(() => {
            return bookService.getItem(id);
        });
    },
    getAuthorsForBook: (book) => {
        const bookId = getItemId(book);

        return knex("book_authors").select("author_id").where({
            book_id: bookId
        });
    },
    addAuthorToBook: (author, book) => {
        const authorId = getItemId(author);
        const bookId = getItemId(book);

        const data = {
            book_id: bookId,
            author_id: authorId
        };

        return knex("book_authors").select("*").where(data).then(recordSet => {
            if (recordSet.length === 0) {
                return knex("book_authors").insert(data).then(() => updateLastUpdatedForBook(bookId));
            } else {
                return Promise.resolve();
            }
        }).then(() => {
            return bookService.getAuthorsForBook(bookId);
        });
    },
    removeAuthorFromBook: (author, book) => {
        const authorId = getItemId(author);
        const bookId = getItemId(book);

        return knex("book_authors").del().where({
            book_id: bookId,
            author_id: authorId
        }).then(() => updateLastUpdatedForBook(bookId)).then(() => {
            return bookService.getAuthorsForBook(bookId);
        });
    },
    getTagsForBook: (book) => {
        const bookId = getItemId(book);

        return knex("book_tags").select("tag_id").where({
            book_id: bookId
        });
    },
    addTagToBook: (tag, book) => {
        const tagId = getItemId(tag);
        const bookId = getItemId(book);

        const data = {
            book_id: bookId,
            tag_id: tagId
        };

        return knex("book_tags").select("*").where(data).then(recordSet => {
            if (recordSet.length === 0) {
                return knex("book_tags").insert(data).then(() => updateLastUpdatedForBook(bookId));
            } else {
                return Promise.resolve();
            }
        }).then(() => {
            return bookService.getTagsForBook(bookId);
        });
    },
    removeTagFromBook: (tag, book) => {
        const tagId = getItemId(tag);
        const bookId = getItemId(book);

        return knex("book_tags").del().where({
            book_id: bookId,
            tag_id: tagId
        }).then(() => updateLastUpdatedForBook(bookId)).then(() => {
            return bookService.getTagsForBook(bookId);
        });
    },
    getGenraForBook: (book) => {
        const bookId = getItemId(book);

        return knex("book_genras").select("genra_id").where({
            book_id: bookId
        });
    },
    addGenraToBook: (genra, book) => {
        const genraId = getItemId(genra);
        const bookId = getItemId(book);

        const data = {
            book_id: bookId,
            genra_id: genraId
        };

        return knex("book_genras").select("*").where(data).then(recordSet => {
            if (recordSet.length === 0) {
                return knex("book_genras").insert(data).then(() => updateLastUpdatedForBook(bookId));
            } else {
                return Promise.resolve();
            }
        }).then(() => {
            return bookService.getGenraForBook(bookId);
        });
    },
    removeGenraFromBook: (genra, book) => {
        const genraId = getItemId(genra);
        const bookId = getItemId(book);

        return knex("book_genras").del().where({
            book_id: bookId,
            genra_id: genraId
        }).then(() => updateLastUpdatedForBook(bookId)).then(() => {
            return bookService.getGenraForBook(bookId);
        });
    }
}; // close bookService

module.exports = bookService;
