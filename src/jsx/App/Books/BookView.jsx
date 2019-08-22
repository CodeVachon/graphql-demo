import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Row from "./../Common/Row";
import Col from "./../Common/Col";
import Loading from "./../Common/Loading";

const BookView = ({ match }) => {
    const [ book, setBook ] = useState(false);
    const [ aurhors, setAuthors ] = useState(false);
    const [ tags, setTags ] = useState(false);
    const [ genras, setGenras ] = useState(false);

    useEffect(() => {
        let BooksQraphQLBody = `
            book(id: "${match.params.bookid}") {
                id
                title
                deck
                coverImage
                language
                publishDate
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

        axios({
            method: "POST",
            url: "/graphQL",
            data: {
                query: `{ ${BooksQraphQLBody} }`
            },
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        }).then(response => response.data).then((response) => {
            setBook(response.data.book);
            setAuthors(response.data.book.authors);
            setGenras(response.data.book.genras);
            setTags(response.data.book.tags);
        });
    }, []);

    return (
        <Row>
            <Col className="col-3">
                {
                    (book)?(
                        <img src={ book.coverImage } title={ book.title } className="img-fluid" />
                    ):(
                        <Loading />
                    )
                }
            </Col>
            <Col>
                {
                    (book)?(
                        <>
                            <h2>{ book.title }</h2>
                            {
                                (aurhors)?(
                                    <ul className="list-inline with-commas">
                                        <li className="list-inline-item">Author:</li>
                                        { aurhors.map(author => (
                                            <li className="list-inline-item" key={ author.id }>
                                                <Link to={ `/author/${author.id}` }>{ author.name }</Link>
                                            </li>
                                        )) }
                                    </ul>
                                ):(<Loading />)
                            }
                            <p className="lead">{ book.deck }</p>
                            <hr />
                            <p>Publish Date: { book.publishDate }</p>
                            <p>Language: { book.language }</p>
                            {
                                (genras)?(
                                    <ul className="list-inline with-commas">
                                        <li className="list-inline-item">Genra:</li>
                                        { genras.map(genra => (
                                            <li className="list-inline-item" key={ genra.id }>
                                                <Link to={ `/genra/${genra.id}` }>{ genra.name }</Link>
                                            </li>
                                        )) }
                                    </ul>
                                ):(<Loading />)
                            }
                            {
                                (tags)?(
                                    <ul className="list-inline with-commas">
                                        <li className="list-inline-item">Tags:</li>
                                        { tags.map(tag => (
                                            <li className="list-inline-item" key={ tag.id }>
                                                <Link to={ `/tag/${tag.id}` }>{ tag.name }</Link>
                                            </li>
                                        )) }
                                    </ul>
                                ):(<Loading />)
                            }
                        </>
                    ):(
                        <Loading />
                    )
                }
            </Col>
        </Row>
    );
}; // close BookView

export default BookView;
