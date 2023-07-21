const express = require('express');
require('dotenv').config();

const app = express();

const handlebars = require('express-handlebars');

const route = require('./src/routes');

app.use(express.static('src/public'));
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', 'src/resources/views');

route(app);

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server Start OK. PORT: ${process.env.PORT || 8080}`);
});
