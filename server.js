const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
global.__basedir = __dirname;

const mongoose = require('mongoose');
const { MONGO_DB } = require('./config');
mongoose.connect(MONGO_DB);

mongoose.connection.on('connected', () => {
    console.log('connected');
});
mongoose.connection.on('error', (error) => {
    console.log('Some error', error);
});

const APP_PORT = 5000;

app.use(cors());
app.use(express.json());

require('./models/user_model');
app.use(require('./routes/user_router'));

require('./models/properties_model');
app.use(require('./routes/properties_router'));

app.use(require('./routes/file_router'))
app.use(require('./routes/sms_router'));
app.use(require('./routes/email_router'));

app.use(require('./routes/file_router'));

require('./models/address_model');
app.use(require('./routes/address_route'))

require('./models/interested_model');
app.use(require('./routes/intrested_router'));

require('./models/tenants_model');
app.use(require('./routes/tenants_router'));

app.listen(APP_PORT, () => {
    console.log('Server started on port: ' + `${APP_PORT}`);
});