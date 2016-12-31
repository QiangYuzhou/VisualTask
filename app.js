var express=require('express');
var app=express();


app.set('views',__dirname+'/views');
app.engine('html',require('ejs').renderFile);
app.set('view engine','html');
app.use(express.static('public'));

require('./routes')(app);

var server=app.listen(8081);