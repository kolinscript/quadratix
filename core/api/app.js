const express            = require('express');
const bodyParser         = require('body-parser');
const cors               = require('cors');
const apiV1              = require('./routes/v1');

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/v1', apiV1);

app.listen(port, () => console.log('Api live on port', + port));