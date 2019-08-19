const shortid = require("shortid");
const extend = require("extend");
const knex = require("./knex");
const getItemId = require("./getItemId");

const genraService = {
    getList: (where, pageNo) => {
        if (!pageNo) {
            pageNo = 1;
        }
        const itemsPerPage = 10;
        const offset = ((pageNo - 1) * itemsPerPage);

        return knex("genra").select("*").where(extend({
            isDeleted: 0
        }, where)).limit(itemsPerPage).offset(offset);
    },
    getCount: (where) => {
        return knex("genra").count("id as count").where(extend({
            isDeleted: 0
        }, where)).then(recordSet => recordSet[0].count);
    },
    getItem: (id) => {
        return knex("genra").first("*").where({
            id: id,
            isDeleted: 0
        });
    },
    createItem: (data) => {
        const record = extend(false, {
            id: shortid.generate(),
            name: ""
        }, data);

        return knex("genra").insert(record).then(() => {
            return genraService.getItem(record.id);
        });
    },
    editItem: (id, data) => {
        data.updated = new Date();

        return knex("genra").update(data).where({
            id: id
        }).then(() => {
            return genraService.getItem(id);
        });
    },
    deleteItem: (id) => {
        return knex("genra").update({
            isDeleted: true
        }).where({
            id: id
        }).then(() => {
            return genraService.getItem(id);
        });
    },
    getBooksForGenra: (genra) => {
        const genraId = getItemId(genra);

        return knex("book_genras").select("book_id").where({
            genra_id: genraId
        });
    }
}; // close genraService

module.exports = genraService;
