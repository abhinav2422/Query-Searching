const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const rake = require('node-rake');
const ci = require('case-insensitive');

const app = express();

const bt = require('./qna');

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
    res.render('/res');
})

app.post('/res', (req, res) => {
    const keywords = rake.generate(req.body.query);

    for (var i = 0; i < bt.length; i++) {
        var keywordfile = rake.generate(bt[i].Q);
        //console.log(keywordfile);
        //console.log(keywords);
        
        for(var j = 0; j < keywordfile.length; j++){
            for(var k = 0; k < keywords.length; k++){
                if(ci(keywords[k]).equals(keywordfile[j])){
                    res.render('res', {
                        ques: bt[i].Q,
                        ans: bt[i].A,
                    });
                    console.log(keywords);
                    console.log(keywordfile);
                    var flag = 1;
                    return;
                }
            }
        }
    }

    if(flag!=1){
        res.render('home', {
            nores: "No queries found, please clarify."
        });
    }
    /*res.render('res', {
        ques: ques,
        and: ans,
    });*/
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});