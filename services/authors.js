const shortid = require("shortid");
const extend = require("extend");
const knex = require("./knex");
const getItemId = require("./getItemId");

const authorService = {
    getList: (where, pageNo) => {
        if (!pageNo) {
            pageNo = 1;
        }
        const itemsPerPage = 10;
        const offset = ((pageNo - 1) * itemsPerPage);

        return knex("authors").select("*").where(extend({
            isDeleted: 0
        }, where)).limit(itemsPerPage).offset(offset);
    },
    getCount: (where) => {
        return knex("authors").count("id as count").where(extend({
            isDeleted: 0
        }, where)).then(recordSet => recordSet[0].count);
    },
    getItem: (id) => {
        return knex("authors").first("*").where({
            id: id,
            isDeleted: 0
        });
    },
    createItem: (data) => {
        const record = extend(false, {
            id: shortid.generate(),
            name: "",
            photo: ""
        }, data);

        return knex("authors").insert(record).then(() => {
            return authorService.getItem(record.id);
        });
    },
    editItem: (id, data) => {
        data.updated = new Date();

        return knex("authors").update(data).where({
            id: id
        }).then(() => {
            return authorService.getItem(id);
        });
    },
    deleteItem: (id) => {
        return knex("authors").update({
            isDeleted: true
        }).where({
            id: id
        }).then(() => {
            return authorService.getItem(id);
        });
    },
    getBooksForAuthor: (author) => {
        const authorId = getItemId(author);

        return knex("book_authors").select("book_id").where({
            author_id: authorId
        });
    }
}; // close authorService

module.exports = authorService;
