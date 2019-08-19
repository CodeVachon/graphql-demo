import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Container from "./Common/Container";
import Row from "./Common/Row";
import Col from "./Common/Col";
import Breadcrumb from "./Common/Breadcrumb";
import BookList from "./Books/BookList";
import BookView from "./Books/BookView";

const AppIndex = () => {
    return (
        <BrowserRouter>
            <Container>
                <Row>
                    <Col>
                        <h1 className="my-4"><FontAwesomeIcon icon="book-reader" /> Book Store!!!</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Breadcrumb />
                    </Col>
                </Row>
                <Switch>
                    <Route exact path="/" component={ BookList } />
                    <Route exact path="/author/:authorId" component={ BookList } />
                    <Route exact path="/tag/:tagId" component={ BookList } />
                    <Route exact path="/genra/:genraId" component={ BookList } />
                    <Route path="/:bookid" component={ BookView } />
                </Switch>
            </Container>
        </BrowserRouter>
    );
};

export default AppIndex;
