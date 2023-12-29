const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article');
const articleRouter = require('./routes/articles.js');
const methodOverride = require('method-override');
const app = express();

mongoose.connect('mongodb://localhost/blog');

// To convert ejs files into HTML
app.set('view engine', 'ejs');

// urlencoded fill the information in req.body
app.use(express.urlencoded({ extended: false } ));
app.use(methodOverride('_method'))


// The main page will have all the articles displayed 
app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
});

app.use('/articles', articleRouter);

app.listen(5000)