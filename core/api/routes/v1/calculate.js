const router        = require('express').Router();

router.post('/calculate', (req, res, next) => {
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
        return res.status(400).send({ error: 'the quadratic equation has no real roots'});
    } else {
        answer.x1 = (-b+Math.sqrt(d))/(2*a).toFixed(4);
        answer.x2 = (-b-Math.sqrt(d))/(2*a).toFixed(4);
    }

    return res.status(200).send(answer);
});

module.exports = router;