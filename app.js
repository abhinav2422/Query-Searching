const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('home');
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});