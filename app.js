const express = require('express');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');


app = express();
bodyParser.urlencoded({extended : true});
app.set('view engine', 'ejs');





const PORT = process.env.PORT || 3000;

app.listen(PORT, () => { console.log('Server is running on port 3000...' )})