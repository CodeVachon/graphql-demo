const { readFileSync } = require("fs");
const { resolve } = require("path");
const { buildSchema } = require("graphql");

module.exports = buildSchema(
    readFileSync(
        resolve(__dirname, "./schema.gql"),
        "utf-8"
    )
);
