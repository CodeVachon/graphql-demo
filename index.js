const express = require("express");
const app = express();
const PORT = require("./package.json").nodemonConfig.env.PORT;

const init = require("./init");

init().then(() => {
    app.set("json spaces", 4);
    app.set("view engine", "pug");
    app.use(express.static(__dirname + "/public"));

    app.use("/", require("./routes/index")());

    app.listen(PORT, () => {
        console.info("http://localhost:" + PORT);
    });
});
