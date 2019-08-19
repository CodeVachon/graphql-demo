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
        axios({
            method: "GET",
            url: `/rest/books/${match.params.bookid}`
        }).then(response => response.data).then(recordSet => {
            setBook(recordSet);
        });
        axios({
            method: "GET",
            url: `/rest/books/${match.params.bookid}/authors`
        }).then(response => response.data).then(recordSet => {
            setAuthors(recordSet);
        });
        axios({
            method: "GET",
            url: `/rest/books/${match.params.bookid}/tags`
        }).then(response => response.data).then(recordSet => {
            setTags(recordSet);
        });
        axios({
            method: "GET",
            url: `/rest/books/${match.params.bookid}/genras`
        }).then(response => response.data).then(recordSet => {
            setGenras(recordSet);
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
