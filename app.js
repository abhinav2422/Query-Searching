const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const keywordExtractor = require('keyword-extractor');

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
    var extractionResult = keywordExtractor.extract(req.body.query, {
        language:"english",
        remove_digits: true,
        return_changed_case:true,
        remove_duplicates: false
   });
   console.log(req.body.query);
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});