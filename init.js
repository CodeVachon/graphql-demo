const knex = require("./services/knex");
const authorService = require("./services/authors");
const tagService = require("./services/tags");
const gernaService = require("./services/genras");
const bookService = require("./services/books");
const Books = [
    {
        title: "Mortal Engines #1: Mortal Engines",
        deck: "London is hunting again. Emerging from its hiding place in the hills, the great Traction City is chasing a terrified little town across the wastelands. Soon, London will feed.",
        language: "english",
        coverImage: "/images/71XpHdGWsLL.jpg",
        publishDate: "2001-05-30",
        gernas: ["sci-fi"],
        authors: ["Philip Reeve"],
        tags: ["movie", "best seller", "first part"]
    },
    {
        title: "Mortal Engines #2: Predator's Gold",
        deck: "With the great Traction City of London completely destroyed, Tom Natsworthy and Hester Shaw travel across the world, trading with other airships and adventuring on the exciting and exotic routes of the Bird Roads. When their little scrapyard aircraft is pursued by rocket-firing gunships, the ice city of Anchorage offers them sanctuary. But as Tom and Hester soon discover, it is no safe refuge. Devastated by plague in recent years and haunted by ghosts and madness, Anchorage is headed for the Dead Continent of North America. It's a perilous course, one that will take them directly into a firestorm of danger and conflict.",
        language: "english",
        coverImage: "/images/61Na65W2auL.jpg",
        publishDate: "2003-05-30",
        gernas: ["sci-fi"],
        authors: ["Philip Reeve"],
        tags: ["second part"]
    },
    {
        title: "Mortal Engines #3: Infernal Devices",
        deck: "The mighty engines of Anchorage have been rusted and dead for years. The derelict city no longer roams the Ice Wastes, but has settled on the edge of the land that was once America. Tom Natsworthy and Hester Shaw are happy in the safety of a static settlement, but their daughter, Wren, is desperate for adventure. When a dangerously charming submarine pirate offers her a chance to escape, Wren doesn't think twice about leaving her home and her parents behind. But the pirate wants something in return--Wren must steal the mysterious Tin Book. To do so will ignite a conflict that could tear the whole world apart.",
        language: "english",
        coverImage: "/images/612l5LVfjKL.jpg",
        publishDate: "2006-05-30",
        gernas: ["sci-fi"],
        authors: ["Philip Reeve"],
        tags: ["best seller", "third part"]
    },
    {
        title: "Thrawn",
        deck: "In this definitive novel, readers will follow Thrawn’s rise to power—uncovering the events that created one of the most iconic villains in Star Wars history.",
        language: "english",
        coverImage: "/images/91SxgwHMc0L.jpg",
        publishDate: "2017-04-11",
        gernas: ["sci-fi"],
        authors: ["Timothy Zahn"],
        tags: ["star wars", "best seller", "first part"]
    },
    {
        title: "Thrawn: Alliances",
        deck: "\"I have sensed a disturbance in the Force.\" Ominous words under any circumstances, but all the more so when uttered by Emperor Palpatine.",
        language: "english",
        coverImage: "/images/81S32avakiL.jpg",
        publishDate: "2018-07-24",
        gernas: ["sci-fi"],
        authors: ["Timothy Zahn"],
        tags: ["star wars", "second part"]
    },
    {
        title: "Thrawn: Treason",
        deck: "As Thrawn works to secure his place in the Imperial hierarchy, his former protege Eli Vanto returns with a dire warning about Thrawn’s homeworld. Thrawn’s mastery of strategy must guide him through an impossible choice: duty to the Chiss Ascendancy, or fealty to the Empire he has sworn to serve. Even if the right choice means committing treason.",
        language: "english",
        coverImage: "/images/91oQWZYSXtL.jpg",
        publishDate: "2019-07-23",
        gernas: ["sci-fi"],
        authors: ["Timothy Zahn"],
        tags: ["star wars", "new release", "third part"]
    },
    {
        title: "The Fellowship of the Ring",
        deck: "Sauron, the Dark Lord, has gathered to him all the Rings of Power – the means by which he intends to rule Middle-earth. All he lacks in his plans for dominion is the One Ring – the ring that rules them all – which has fallen into the hands of the hobbit, Bilbo Baggins.",
        language: "english",
        coverImage: "/images/311cT2c6+UL.jpg",
        publishDate: "1956-10-20",
        gernas: ["fantasy"],
        authors: ["J. R. R. Tolkien"],
        tags: ["lord of the rings", "best seller", "movie", "first part"]
    },
    {
        title: "The Two Towers",
        deck: "Frodo and the Companions of the Ring have been beset by danger during their quest to prevent the Ruling Ring from falling into the hands of the Dark Lord by destroying it in the Cracks of Doom. They have lost the wizard, Gandalf, in the battle with an evil spirit in the Mines of Moria; and at the Falls of Rauros, Boromir, seduced by the power of the Ring, tried to seize it by force. While Frodo and Sam made their escape the rest of the company were attacked by Orcs.",
        language: "english",
        coverImage: "/images/31hKswpZDxL.jpg",
        publishDate: "1957-10-20",
        gernas: ["fantasy"],
        authors: ["J. R. R. Tolkien"],
        tags: ["lord of the rings", "movie", "second part"]
    },
    {
        title: "The Return of the King",
        deck: "The armies of the Dark Lord Sauron are massing as his evil shadow spreads even wider. Men, Dwarves, Elves and Ents unite forces to do battle against the Dark. Meanwhile, Frodo and Sam struggle further into Mordor, guided by the treacherous creature Gollum, in their heroic quest to destroy the One Ring…",
        language: "english",
        coverImage: "/images/311cT2c6+UL.jpg",
        publishDate: "1958-10-20",
        gernas: ["fantasy"],
        authors: ["J. R. R. Tolkien"],
        tags: ["lord of the rings", "movie", "third part"]
    }
]; // close Books

const init = () => {
    console.info("Init!");
    return knex.schema.hasTable("books").then((exists) => {
        if (!exists) {
            console.info("Build Books Schema");
            return knex.schema.createTable("books", (table) => {
                table.string("id", 10).primary();
                table.string("title", 50).notNull().defaultTo("");
                table.string("deck", 255).defaultTo("");
                table.string("language", 255).defaultTo("");
                table.string("coverImage", 800).defaultTo("");
                table.dateTime("publishDate");
                table.dateTime("created").notNull().defaultTo(knex.fn.now());
                table.dateTime("updated").notNull().defaultTo(knex.fn.now());
                table.boolean("isDeleted").notNull().defaultTo(false);
            });
        }
    }).then(() => {
        return knex.schema.hasTable("authors").then((exists) => {
            if (!exists) {
                console.info("Build Authors Schema");
                return knex.schema.createTable("authors", (table) => {
                    table.string("id", 10).primary();
                    table.string("name", 50).notNull().defaultTo("");
                    table.string("photo", 800).defaultTo("");
                    table.dateTime("created").notNull().defaultTo(knex.fn.now());
                    table.dateTime("updated").notNull().defaultTo(knex.fn.now());
                    table.boolean("isDeleted").notNull().defaultTo(false);
                });
            }
        });
    }).then(() => {
        return knex.schema.hasTable("book_authors").then((exists) => {
            if (!exists) {
                console.info("Build Book Authors Schema");
                return knex.schema.createTable("book_authors", (table) => {
                    table.string("book_id", 10).notNull();
                    table.foreign("book_id").references("books.id");
                    table.string("author_id", 10).notNull();
                    table.foreign("author_id").references("authors.id");
                    table.unique(["book_id", "author_id"]);
                });
            }
        });
    }).then(() => {
        return knex.schema.hasTable("genra").then((exists) => {
            if (!exists) {
                console.info("Build Genra Schema");
                return knex.schema.createTable("genra", (table) => {
                    table.string("id", 10).primary();
                    table.string("name", 50).notNull();
                    table.boolean("isDeleted").notNull().defaultTo(false);
                });
            }
        });
    }).then(() => {
        return knex.schema.hasTable("book_genras").then((exists) => {
            if (!exists) {
                console.info("Build Book Genras Schema");
                return knex.schema.createTable("book_genras", (table) => {
                    table.string("book_id", 10).notNull();
                    table.foreign("book_id").references("books.id");
                    table.string("genra_id", 10).notNull();
                    table.foreign("genra_id").references("genra.id");
                    table.unique(["book_id", "genra_id"]);
                });
            }
        });
    }).then(() => {
        return knex.schema.hasTable("tags").then((exists) => {
            if (!exists) {
                console.info("Build Tags Schema");
                return knex.schema.createTable("tags", (table) => {
                    table.string("id", 10).primary();
                    table.string("name", 10).notNull();
                    table.boolean("isDeleted").notNull().defaultTo(false);
                });
            }
        });
    }).then(() => {
        return knex.schema.hasTable("book_tags").then((exists) => {
            if (!exists) {
                console.info("Build Book Tags Schema");
                return knex.schema.createTable("book_tags", (table) => {
                    table.string("book_id", 10).notNull();
                    table.foreign("book_id").references("books.id");
                    table.string("tag_id", 10).notNull();
                    table.foreign("tag_id").references("tags.id");
                    table.unique(["book_id", "tag_id"]);
                });
            }
        });
    }).then(() => {
        return knex.schema.hasTable("book_reviews").then((exists) => {
            if (!exists) {
                console.info("Build Book Reviews Schema");
                return knex.schema.createTable("book_reviews", (table) => {
                    table.string("id", 10).primary();
                    table.string("book_id", 10).notNull();
                    table.foreign("book_id").references("books.id");
                    table.string("author", 10).notNull().defaultTo("Anonymous");
                    table.integer("rating", 10).notNull().defaultTo(0);
                    table.dateTime("created").notNull().defaultTo(knex.fn.now());
                    table.dateTime("updated").notNull().defaultTo(knex.fn.now());
                    table.boolean("isDeleted").notNull().defaultTo(false);
                });
            }
        });
    }).then(() => {
        const all_authors = [];
        const all_tags = [];
        const all_genras = [];

        Books.forEach(Book => {
            Book.authors.forEach(author => {
                if (!all_authors.some(thisAuthor => thisAuthor === author)) {
                    all_authors.push(author);
                }
            });
            Book.tags.forEach(tag => {
                if (!all_tags.some(thisTag => thisTag === tag)) {
                    all_tags.push(tag);
                }
            });
            Book.gernas.forEach(genra => {
                if (!all_genras.some(thisGenra => thisGenra === genra)) {
                    all_genras.push(genra);
                }
            });
        });

        return Promise.all([
            Promise.all(all_authors.map(author => new Promise((resolve, reject) => {
                const data = { name: author  };

                authorService.getList(data).then(recordSet => {
                    if (recordSet.length === 0) {
                        authorService.createItem(data).then(resolve).catch(reject);
                    } else {
                        resolve(recordSet[0]);
                    }
                });
            }))),
            Promise.all(all_tags.map(tag => new Promise((resolve, reject) => {
                const data = { name: tag  };

                tagService.getList(data).then(recordSet => {
                    if (recordSet.length === 0) {
                        tagService.createItem(data).then(resolve).catch(reject);
                    } else {
                        resolve(recordSet[0]);
                    }
                });
            }))),
            Promise.all(all_genras.map(genra => new Promise((resolve, reject) => {
                const data = { name: genra  };

                gernaService.getList(data).then(recordSet => {
                    if (recordSet.length === 0) {
                        gernaService.createItem(data).then(resolve).catch(reject);
                    } else {
                        resolve(recordSet[0]);
                    }
                });
            })))
        ]).then(([
            authors,
            tags,
            genras
        ]) => {
            // Add Details to Books
            return Promise.all(Books.map(book => new Promise((resolve, reject) => {
                // Create Book is not already there
                bookService.getList({ title: book.title }).then(recordSet => {
                    if (recordSet.length === 0) {
                        return bookService.createItem({
                            title: book.title,
                            deck: book.deck,
                            language: book.language,
                            coverImage: book.coverImage,
                            publishDate: book.publishDate
                        });
                    } else {
                        return Promise.resolve(recordSet[0]);
                    }
                }).then(record => {
                    // Add Details
                    return Promise.all([
                        // Add Book Authors
                        Promise.all(book.authors.map(author => {
                            return bookService.addAuthorToBook(authors.filter(thisAuthor => thisAuthor.name === author)[0], record.id);
                        })),
                        // Add Book Tags
                        Promise.all(book.tags.map(tag => {
                            return bookService.addTagToBook(tags.filter(thisTag => thisTag.name === tag)[0], record.id);
                        })),
                        // Add Book Generas
                        Promise.all(book.gernas.map(genra => {
                            return bookService.addGenraToBook(genras.filter(thisGenra => thisGenra.name === genra)[0], record.id);
                        }))
                    ]);
                }).then(resolve).catch(reject);
            })));
        });
    }).then(() => {
        console.info("Init Complete!");
    }).catch(error => {
        console.error(error);
    });
};

module.exports = init;
