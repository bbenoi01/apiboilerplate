const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middleware/requireAuth');

const Generic = mongoose.model('Generic');

const router = express.Router();

router.use(requireAuth);

router.get('/generics', async (req, res) => {
    const generics = await Generic.find({ userId: req.user._id });

    res.send(generics);
});

router.post('/generics', async (req, res) => {
    const { xx, yy } = req.body;

    if (!xx || !yy) {
        return res.status(422).send({ error: 'You must provide xx and yy' });
    }

    try {
        const generic = new Generic({ xx, yy, userId: req.user._id });
        await generic.save();
        res.send(generic);
    } catch (err) {
        res.status.send({ error: err.message });
    }
});

module.exports = router;