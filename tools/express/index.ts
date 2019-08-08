/* eslint-disable no-console */
import * as express from 'express';
import * as bodyParser from 'body-parser';
const app = express();
app.use(bodyParser.json());
app.use(express.static('./'));
app.listen('8080', () => {
    console.log('Example app listening on port ' + 8080 + ' !');
});
app.get('/', (_req, res) => {
    return res.send('Hello World!');
});
app.get('/api', (_req, res) => {
    return res.send('api');
});
app.post('/api', (_req, res) => {
    return res.send('post api');
});
app.post('/data', (req, res) => {
    res.send(req.body);
});
app.post('/code', (req, res) => {
    res.status(req.body.status).send(req.body.data);
});
