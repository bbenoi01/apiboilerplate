const mongoose = require('mongoose');

const genericSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});

mongoose.model('Generic', genericSchema);