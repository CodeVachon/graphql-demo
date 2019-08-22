import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Row from "./../Common/Row";
import Col from "./../Common/Col";
import Card from "./../Common/Card";
import Loading from "./../Common/Loading";

import BookSummary from "./BookSummary";

const BookList = ({ match }) => {
    const [ title, setTitle ] = useState(false);
    const [ bookList, setBookList ] = useState(false);
    const [ authors, setAuthors ] = useState(false);
    const [ tags, setTags ] = useState(false);
    const [ genras, setGenras ] = useState(false);

    useEffect(() => {
        let BooksQraphQLBody = `
            books {
                id
                title
                deck
                coverImage
                authors {
                    id
                    name
                }
                genras {
                    id
                    name
                }
                tags {
                    id
                    name
                }
            }
        `;
        let SidebarQraphQLBody = `
            authors {
                id
                name
            }
            genras {
                id
                name
            }
            tags {
                id
                name
            }
        `;

        new Promise((resolve, reject) => {
            let booksFoundUnderKey;

            if (match.params.hasOwnProperty("authorId")) {
                BooksQraphQLBody = `author(id: "${match.params.authorId}") { name ${BooksQraphQLBody} }`;
                booksFoundUnderKey = "author";
            } else if (match.params.hasOwnProperty("genraId")) {
                BooksQraphQLBody = `genra(id: "${match.params.genraId}") { name ${BooksQraphQLBody} }`;
                booksFoundUnderKey = "genra";
            } else if (match.params.hasOwnProperty("tagId")) {
                BooksQraphQLBody = `tag(id: "${match.params.tagId}") { name ${BooksQraphQLBody} }`;
                booksFoundUnderKey = "tag";
            }


            axios({
                method: "POST",
                url: "/graphQL",
                data: {
                    query: `{ ${BooksQraphQLBody} ${SidebarQraphQLBody} }`
                },
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                }
            }).then(response => response.data).then((response) => {
                const returnData = {
                    authors: response.data.authors,
                    genras: response.data.genras,
                    tags: response.data.tags,
                    books: null,
                    title: null
                };

                if (booksFoundUnderKey) {
                    returnData.books = response.data[booksFoundUnderKey].books;
                    returnData.title = booksFoundUnderKey + ": " + response.data[booksFoundUnderKey].name;
                } else {
                    returnData.books = response.data.books;
                }
                resolve(returnData);
            }).catch(reject);
        }).then(({
            books,
            authors,
            genras,
            tags,
            title
        }) => {
            setBookList(books);
            setAuthors(authors);
            setGenras(genras);
            setTags(tags);
            setTitle(title);
        });
    }, [match]);

    return (
        <Row>
            <Col>
                {
                    (title)?(
                        <h2>{ title }</h2>
                    ):(null)
                }
                {
                    (bookList)?(
                        bookList.map((book) => (<BookSummary key={ book.id } book={ book } />))
                    ):(
                        <Loading />
                    )
                }
            </Col>
            <Col className="col-3">
                {
                    (authors)?(
                        <Card title="Authors">
                            <ul className="list-group list-group-flush">
                                {
                                    authors.map(author => (
                                        <li key={ author.id } className="list-group-item">
                                            <Link to={ `/author/${ author.id }` }>
                                                { author.name }
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </Card>
                    ):(null)
                }
                {
                    (tags)?(
                        <Card title="Tags">
                            <ul className="list-group list-group-flush">
                                {
                                    tags.map(tag => (
                                        <li key={ tag.id } className="list-group-item">
                                            <Link to={ `/tag/${ tag.id }` }>
                                                { tag.name }
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </Card>
                    ):(null)
                }
                {
                    (genras)?(
                        <Card title="Genras">
                            <ul className="list-group list-group-flush">
                                {
                                    genras.map(genra => (
                                        <li key={ genra.id } className="list-group-item">
                                            <Link to={ `/genra/${ genra.id }` }>
                                                { genra.name }
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </Card>
                    ):(null)
                }
            </Col>
        </Row>
    );
}; // close BookList

export default BookList;
