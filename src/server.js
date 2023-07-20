const express = require('express');
require('dotenv').config();
const path = require('path');

const app = express();

const handlebars = require('express-handlebars');

const route = require('./routes');

app.use(express.static(path.join(__dirname, 'public')));
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app);

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server Start OK. PORT: ${process.env.PORT || 8080}`);
});
