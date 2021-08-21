let express=require('express');
let fs=require('fs');
let path=require('path');
// const bodyparser=require('body parser');
const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/singingcontact', {useNewUrlParser: true, useUnifiedTopology: true});
let app=express();
const port=5400;

var db=mongoose.connection;

var contactschema=new mongoose.Schema({
    name: String,
    age: String,
    email: String,
    mobileno: String
});

var contact=mongoose.model('contactus',contactschema);

app.use('/static',express.static('static'));
app.use(express.urlencoded());

app.set('view engine','pug');

app.set('views',path.join(__dirname,'views'));

app.get('/',(req,res)=>{
    res.render('home.pug');
})
app.get('/contact',(req,res)=>{
    res.render('contact.pug');
})
app.post('/contact',(req,res)=>{
    var mydata=new contact(req.body);
    mydata.save().then(()=>{
        res.send("Your data has been stored in database");
    }).catch(()=>{
        res.status(400).send("Your data has not been stored");
    })
})

app.listen(process.env.PORT || 5400)