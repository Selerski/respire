'use strict';

const Koa = require('koa');
const serve = require('koa-static');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = require('./routers.js');

// app.use(serve(conf.clientPath));
app.use(cors());
app.use(bodyParser());
app.use(router.routes());

const port = 3003;

app.listen(port);

console.log(`Server listening on port ${port}`);
