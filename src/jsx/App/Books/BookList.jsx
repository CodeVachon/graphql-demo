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
        if (match.params.hasOwnProperty("tagId")) {
            axios({
                method: "GET",
                url: `/rest/tags/${match.params.tagId}`
            }).then(response => response.data).then(recordSet => {
                setTitle(`Tag: ${recordSet.name}`);
            });
            axios({
                method: "GET",
                url: `/rest/tags/${match.params.tagId}/books`
            }).then(response => response.data).then(recordSet => {
                setBookList(recordSet);
            });
        } else if (match.params.hasOwnProperty("authorId")) {
            axios({
                method: "GET",
                url: `/rest/authors/${match.params.authorId}`
            }).then(response => response.data).then(recordSet => {
                setTitle(`Author: ${recordSet.name}`);
            });
            axios({
                method: "GET",
                url: `/rest/authors/${match.params.authorId}/books`
            }).then(response => response.data).then(recordSet => {
                setBookList(recordSet);
            });
        } else if (match.params.hasOwnProperty("genraId")) {
            axios({
                method: "GET",
                url: `/rest/genras/${match.params.genraId}`
            }).then(response => response.data).then(recordSet => {
                setTitle(`Genra: ${recordSet.name}`);
            });
            axios({
                method: "GET",
                url: `/rest/genras/${match.params.genraId}/books`
            }).then(response => response.data).then(recordSet => {
                setBookList(recordSet);
            });
        } else {
            // Get All Books
            axios({
                method: "GET",
                url: "/rest/books"
            }).then(response => response.data).then(recordSet => {
                setBookList(recordSet);
            });
        }

        axios({
            method: "GET",
            url: "/rest/authors"
        }).then(response => response.data).then(recordSet => {
            setAuthors(recordSet);
        });
        axios({
            method: "GET",
            url: "/rest/tags"
        }).then(response => response.data).then(recordSet => {
            setTags(recordSet);
        });
        axios({
            method: "GET",
            url: "/rest/genras"
        }).then(response => response.data).then(recordSet => {
            setGenras(recordSet);
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
