const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const passport = require('passport');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Db config
const db = require('./config/keys').mongoURI;

//connect to mongoDB using mongoose
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB cluster connected'))
    .catch(err => console.log(err));

// Passport middleware
require('./config/passport')(passport);

app.use(passport.initialize());

//Passport Confi

// Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port , () => console.log(`server is running on port ${port}`));