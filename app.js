const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const sql = require('mssql');

const port = process.env.PORT || 3000;
const app = express();

const config = {
  user: 'sa',
  password: '<YourStrong@Passw0rd>',
  server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
  database: 'books',

  options: {
    encrypt: false, // Use this if you're on Windows Azure
  },
};

sql.connect(config).catch((err) => debug(`Connection Error: ${err}`));
app.use(express.static(path.join(__dirname, '/public')));

app.use(morgan('tiny'));
app.set('views', './src/views');
app.set('view engine', 'pug');

const nav = [
  { link: '/books', title: 'Books' },
  { link: '/authors', title: 'Authors' },
];
const bookRouter = require('./src/routes/bookRoutes')(nav);

app.use('/books', bookRouter);
app.get('/', (req, res) => {
  res.render('index', {
    nav: [
      { link: '/books', title: 'Books' },
      { link: '/authors', title: 'Authors' },
    ],
    title: 'Library',
  });
});

app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});
