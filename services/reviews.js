const shortid = require("shortid");
const extend = require("extend");
const knex = require("./knex");

const reviewsService = {
    getList: (where, pageNo) => {
        if (!pageNo) {
            pageNo = 1;
        }
        const itemsPerPage = 10;
        const offset = ((pageNo - 1) * itemsPerPage);

        return knex("book_reviews").select("*").where(extend({
            isDeleted: 0
        }, where)).limit(itemsPerPage).offset(offset);
    },
    getCount: (where) => {
        return knex("book_reviews").count("id as count").where(extend({
            isDeleted: 0
        }, where)).then(recordSet => recordSet[0].count);
    },
    getItem: (id) => {
        return knex("book_reviews").first("*").where({
            id: id,
            isDeleted: 0
        });
    },
    createItem: (data) => {
        const record = extend(false, {
            id: shortid.generate(),
            book_id: "",
            author: "Anonymous",
            rating: 0
        }, data);

        return knex("book_reviews").insert(record).then(() => {
            return reviewsService.getItem(record.id);
        });
    },
    editItem: (id, data) => {
        data.updated = new Date();

        return knex("book_reviews").update(data).where({
            id: id
        }).then(() => {
            return reviewsService.getItem(id);
        });
    },
    deleteItem: (id) => {
        return knex("book_reviews").update({
            isDeleted: true
        }).where({
            id: id
        }).then(() => {
            return reviewsService.getItem(id);
        });
    }
}; // close reviewsService

module.exports = reviewsService;
