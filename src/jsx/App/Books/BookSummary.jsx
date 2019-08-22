import React from "react";
import { Link } from "react-router-dom";

import Row from "./../Common/Row";
import Col from "./../Common/Col";
import Loading from "./../Common/Loading";

const BookSummary = ({ book }) => {
    const aurhors = book.authors;
    const tags = book.tags;
    const genras = book.genras;

    return (
        <Row className="mb-4 book-list-item">
            <Col className="col-2">
                <Link to={ `/${book.id}` }>
                    <img src={ book.coverImage } title={ book.title } className="img-fluid" />
                </Link>
            </Col>
            <Col>
                <header className="lead"><Link to={ `/${book.id}` }>{ book.title }</Link></header>
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
                <p>{ book.deck }</p>
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
            </Col>
        </Row>
    );
}; // close BookSummary

export default BookSummary;
