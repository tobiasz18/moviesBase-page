
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority `;

mongoose.connect(mongoUri, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});


app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads


const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`))