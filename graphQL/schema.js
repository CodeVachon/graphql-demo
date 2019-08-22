const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type Book {
        id: ID!
        title: String
        deck: String
        language: String
        coverImage: String
        publishDate: String
        created: String
        updated: String
        isDeleted: Boolean
        authors: [Author]
        genras: [Genra]
        tags: [Tag]
    }
    type Author {
        id: ID!
        name: String
        photo: String
        created: String
        updated: String
        isDeleted: Boolean
        books: [Book]
    }
    type Genra {
        id: ID!
        name: String
        books: [Book]
        isDeleted: Boolean
    }
    type Tag {
        id: ID!
        name: String
        isDeleted: Boolean
        books: [Book]
    }
    type Query {
        book(id: ID!): Book
        books: [Book]
        author(id: ID!): Author
        authors: [Author]
        genra(id: ID!): Genra
        genras: [Genra]
        tag(id: ID!): Tag
        tags: [Tag]
    }
`);
