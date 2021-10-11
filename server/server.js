require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { checkToken } = require('./middleware/auth');

const users = require('./routes/api/users');
const articles = require('./routes/api/articles');

const app = express();
const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads
app.use(checkToken);
// routes
app.use('/api/users', users);
app.use('/api/articles', articles);


app.use(express.static('client/build'));

if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client','build','index.html'))
  });
}

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`))