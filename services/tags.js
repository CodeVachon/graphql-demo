const shortid = require("shortid");
const extend = require("extend");
const knex = require("./knex");
const getItemId = require("./getItemId");

const tagsService = {
    getList: (where, pageNo) => {
        if (!pageNo) {
            pageNo = 1;
        }
        const itemsPerPage = 10;
        const offset = ((pageNo - 1) * itemsPerPage);

        return knex("tags").select("*").where(extend({
            isDeleted: 0
        }, where)).limit(itemsPerPage).offset(offset);
    },
    getCount: (where) => {
        return knex("tags").count("id as count").where(extend({
            isDeleted: 0
        }, where)).then(recordSet => recordSet[0].count);
    },
    getItem: (id) => {
        return knex("tags").first("*").where({
            id: id,
            isDeleted: 0
        });
    },
    createItem: (data) => {
        const record = extend(false, {
            id: shortid.generate(),
            name: "",
        }, data);

        return knex("tags").insert(record).then(() => {
            return tagsService.getItem(record.id);
        });
    },
    editItem: (id, data) => {
        data.updated = new Date();

        return knex("tags").update(data).where({
            id: id
        }).then(() => {
            return tagsService.getItem(id);
        });
    },
    deleteItem: (id) => {
        return knex("tags").update({
            isDeleted: true
        }).where({
            id: id
        }).then(() => {
            return tagsService.getItem(id);
        });
    },
    getBooksForTag: (tag) => {
        const tagId = getItemId(tag);

        return knex("book_tags").select("book_id").where({
            tag_id: tagId
        });
    }
}; // close tagsService

module.exports = tagsService;
