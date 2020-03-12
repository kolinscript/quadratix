const express            = require('express');
const path               = require('path');
const bodyParser         = require('body-parser');
const port               = process.env.PORT || 5000;
const app                = express();

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/calculate', (req, res, next) => {
    const { body: { multipliers } } = req;
    const a = multipliers.a;
    const b = multipliers.b;
    const c = multipliers.c;
    const d = b * b - 4 * a * c;
    const answer = {
        x1: null,
        x2: null
    };

    if( d < 0) {
        console.log('The quadratic equation has no real roots');
        return res.status(200).send({ error: 'the quadratic equation has no real roots'});
    } else {
        answer.x1 = (-b+Math.sqrt(d))/(2*a).toFixed(4);
        answer.x2 = (-b-Math.sqrt(d))/(2*a).toFixed(4);
        console.log('Founded roots:', answer);
        return res.status(200).send(answer);
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port, () => console.log('Api live on port', + port));