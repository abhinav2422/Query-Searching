const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

const port = 5000;
appl.listen(port, () => {
    console.log(`Server started on port ${port}`);
});