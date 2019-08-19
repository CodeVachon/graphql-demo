import React from "react";
import ReactDOM from "react-dom";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faEllipsisH, faSpinner, faCheckSquare, faSquare, faBookReader } from "@fortawesome/free-solid-svg-icons";

library.add(faEllipsisH, faSpinner, faCheckSquare, faSquare, faBookReader);

import AppIndex from "./App/Index";

const applicationNode = document.getElementById("Application");

if (applicationNode) {
    ReactDOM.render((<AppIndex />), applicationNode);
}
