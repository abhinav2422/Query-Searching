const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const rake = require('node-rake');

const app = express();

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('home');
});

app.post('/res', (req, res) => {
    const keywords = rake.generate(req.body.query);
    console.log(keywords);
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});