const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const elasticsearch = require('elasticsearch');
const rake = require('node-rake');
const file = require('file-system');
const fs = require('fs');

const app = express();

file.readFile === fs.readFile

var qna = require('./qna.json')

/*var client = new elasticsearch.Client({
  host: 'localhost:5000',
  log: 'trace'
});

client.ping({
    requestTimeout: 2000
    }, 
    (error) => {
        if (error) {
        console.trace('elasticsearch cluster is down!');
        } else {
        console.log('All is well');
    }
});*/

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

app.get('/res', (req, res) => {
    res.render('res');
})

app.post('/res', (req, res) => {
    //const keywords = rake.generate(req.body.query);
    //console.log(keywords);

    //var obj = JSON.parse(qna);
    res.send(qna.Q1 + "<br>" + qna.A1);   
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});