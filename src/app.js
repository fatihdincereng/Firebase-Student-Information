const express=require('express');
const morgan=require('morgan');
const app=express();
const exphbs=require('express-handlebars');
const path=require('path');


//Ayarlar


// Port Değerleri Atandı Set İle Port Değeri Atandı. Js De bir değişkene set ile değer verip exports edersek istediğimiz yerden o değişkene get ile ulaşabiliriz.
app.set('port', process.env.PORT || 3000);
app.set('views',path.join(__dirname,'views'));
app.engine('.hbs',exphbs({
    defaultLayout: 'main',
    extname: '.hbs'

}));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.set('view engine', 'hbs');


//middleware arayazılımlar
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));

//routes
app.use(require('./routes/index'));



//static dosyalar
app.use(express.static(path.join(__dirname,'public')));




module.exports=app;