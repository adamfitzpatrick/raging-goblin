module.exports = () => {
    "use strict";

    let jsonServer = require("json-server");

    let server = jsonServer.create();
    server.use(jsonServer.defaults());
    let db = require("./db.js");
    let router = jsonServer.router(db());

    server.use(router);
    server.listen(3002);
};