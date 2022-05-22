const express = require('express');
const cors = require('cors');
const debug = require('debug')('app:server');

const { Config } = require('./src/config/index');
const { ConnectionDb } = require('./src/database/index')
const { AdminAPI } = require('./src/admin/index');
const { IndexAPI, NotFoundAPI } = require('./src/index/index');
const { ProductAPI } = require('./src/product');
const { ReviewAPI } = require('./src/review');
const { AppointmentAPI } = require('./src/appointment');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

IndexAPI(app);
ConnectionDb(app);
AdminAPI(app);
ProductAPI(app);
ReviewAPI(app);
AppointmentAPI(app);

NotFoundAPI(app);

app.listen(Config.port, () => {
    debug(`Server listening in port: ${Config.port}`);
});