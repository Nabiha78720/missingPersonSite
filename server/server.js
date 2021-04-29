let express= require('express');
let myApp=express();

var multer  = require('multer');
// var upload = multer({ dest: 'E:/All Projects/gamica projects/missing-person-site/server/allData/uploads/' });

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'E:/All Projects/gamica projects/missing-person-site/server/allData/uploads/')
    },
    filename: function (req, file, cb) {
        // console.log(file)
      cb(null, file.originalname )
    }
})
   
var upload = multer({ storage: storage })

let BodyParser= require('body-parser');
myApp.use(BodyParser.json());

let config= require('./config');
let jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');

let mongoose=require('mongoose');
let SiteUsers = require('.//db/models/users');
let MissingPersons = require('.//db/models/missingPersons');

mongoose.connect('mongodb://localhost:27017/SiteUser',(err,connection)=>{
    console.log(err || connection);
});

// myApp.get('/', function(req, res){
//     res.end('Main')
// });

myApp.post('/checksession', async function(req, res){
    console.log(req.body.token);
    // let resp = await jwt.verify(req.body.token, config.secret);
    var decoded = jwt_decode(req.body.token);
    console.log(decoded);
    if(decoded.id){
        SiteUsers.findOne({_id:decoded.id}, function (err, docs) {
            res.send(docs);
        });
    }
 });

myApp.post('/signup', async function(req, res){
    // console.log(req.body)
    let user =new SiteUsers();
    user.name= req.body.name,
    user.email=req.body.email,
    user.password=req.body.password,
    await user.save();
    res.json({
        msg:"Nabiha"
    });
});
myApp.post('/login', async function(req, res){
    // console.log(req.body);
    let user = await SiteUsers.findOne({ email: req.body.email,password:req.body.password})
    // console.log(SiteUsers)
    // console.log(user)

    if (user) {
        let userToken = { id: user._id }
        jwt.sign(userToken, config.secret, {
            expiresIn: "6d"
        }, (err, token) => {
            res.json({
                token,
                success: true,
                msg:"User Found",
                _id: user._id,
                name: user.name,
                password:user.password,
                email: user.email
            })
        });
    }else{
        res.json({
            msg:'User Not Found'
        })
    }
});

myApp.post('/postad', upload.single('missingPic'), async function(req, res){
    // console.log(req.body)
    // console.log(req.file);
    let mpeople = new MissingPersons();
    mpeople.referenceId=req.body.id,
    mpeople.mPersonName= req.body.missingName,
    mpeople.mPersonAge=req.body.missingAge,
    mpeople.mPersonDescription=req.body.missingDescription,
    mpeople.mPersonPic=req.file.filename,
    
    // console.log(mpeople),
    await mpeople.save();
    // console.log(adData.missingPic),
    // console.log(SiteUsers)
    res.json({
        msg:"Nabiha"
    });
});

myApp.post('/cards',async function(req,res){
    // console.log(req.body)
    MissingPersons.find({}, function (err, mpeople) {
        res.send(mpeople);
    });
})
myApp.post('/delete',async function(req,res){
    console.log(req.body)
    MissingPersons.findOneAndDelete({referenceId: req.body.delId ,_id: req.body.delPersonId },function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Deleted User : ", docs);
        }
    })
    MissingPersons.find({}, function (err, mpeople) {
        res.send(mpeople);
    });
    
})
myApp.post('/search',async function(req,res){
    // console.log(req.body.mPersonName)
    const regex = new RegExp(req.body.mPersonName, 'i')
    MissingPersons.find({mPersonName: regex}, function (err, mpeople) {
        res.send(mpeople);
    });
    
})

myApp.listen(5050,function(){
    console.log('Server in Working State')
})