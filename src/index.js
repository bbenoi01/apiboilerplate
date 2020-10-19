require('./models/User');
require('./models/Generic');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const genericRoutes = require('./routes/genericRoutes');
const requireAuth = require('./middleware/requireAuth');

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(genericRoutes);

mongoUri = ''; // Connection string from MongoDB Atlas Example:(mongodb+srv://admin:<password>@cluster0.3tx5j.mongodb.net/<dbname>?retryWrites=true&w=majority)
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance.');
});
mongoose.connection.on('error', (err) => {
    console.error('Error connecting to mongo.', err);
});

app.get('/', requireAuth, (req, res) => {
    res.send(`Your email: ${req.user.email}`);
});

app.listen(3005, () => {
    console.log('Listening on port 3005');
});
