const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname, '/public')));

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'daledale', resave: false, saveUninitialized: false }));
require('./src/config/passport.js')(app);

app.set('views', './src/views');
app.set('view engine', 'pug');

const nav = [
  { link: '/books', title: 'Books' },
  { link: '/authors', title: 'Authors' },
];
const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);
const authRouter = require('./src/routes/authRoutes')(nav);

app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);
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
