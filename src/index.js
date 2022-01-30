const app=require('./app');

// Başlataılacak Port Belirlendi
app.listen(app.get('port'));
console.log('Server On Port',app.get('port'));


