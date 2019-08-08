"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.json());
app.use(express.static('./'));
app.listen('8080', function () {
    console.log('Example app listening on port ' + 8080 + ' !');
});
app.get('/', function (_req, res) {
    return res.send('Hello World!');
});
app.get('/api', function (_req, res) {
    return res.send('api');
});
app.post('/api', function (_req, res) {
    return res.send('post api');
});
app.post('/data', function (req, res) {
    res.send(req.body);
});
app.post('/code', function (req, res) {
    res.status(req.body.status).send(req.body.data);
});
//# sourceMappingURL=index.js.map