const {Router} =require('express');
const router=Router();
// Firebase Admin eklendi
const admin=require('firebase-admin');

// firebase admin sdk yükledik.
var serviceAccount = require("../../node-firebase-express-firebase-adminsdk-r7p6p-e4f4e846b0.json");
// firebase baglantisi
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL :'https://node-firebase-express-default-rtdb.firebaseio.com/'
});
//Database degisken degeri
const db= admin.database();

// Ana Sayfayı Render Eden Kod
router.get('/',(req,res)=>{
    res.render('anasayfa');
});
// Yeni Sayfayı Render Eden Kod
router.get('/new-login',(req,res)=>{
    res.render('index');
})


// Student Sayfası Ayarlandı ve Student Sayfasına Veri Tabanından Gelen Veriler Yazdırıldı
router.get('/student',(req,res)=>{

    db.ref('students').once('value',(snapshot)=>{
        const data=snapshot.val();
        res.render('index',{students:data});
    });
    
});


// Post İşlemi Yaptırıldı. Req.body den gelen değerler bir değişkene aktarıldı ve bu değişken psuh ile veri tabanına gönderildi 
router.post('/new-student',(req,res)=>{
    console.log(req.body);
    const newStudent={
        ogrenciad:req.body.ogrenciad,
        ogrencisoyad:req.body.ogrencisoyad,
        ogrencinotortalamasi:req.body.ogrencinotortalamasi,
        ogrenciprojesayisi:req.body.ogrenciprojesayisi
    }
    db.ref('students').push(newStudent);
    res.redirect('/student');

});


// Student içerisinde Gönderilen id ye göre silme işlemi yaptırıldı. Api Oluşturuldu genel bir fonksiyondur params.id ye göre remove eder.
// id ye göre silme islemleri
router.get('/delete-student/:id',(req,res)=>{

    db.ref('students/'+req.params.id).remove();
    res.redirect('/student');
});


module.exports=router;