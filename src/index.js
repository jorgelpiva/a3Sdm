const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));

app.get('/',(req, res) => {
    res.send("home backEnd de Sistemas Distribuídos ref 1306 1930")
});

require('../app/controllers/index')(app);

app.listen(4000);


