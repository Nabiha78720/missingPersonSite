let mongoose = require('mongoose');

let missingPersonSchema=mongoose.Schema({
    referenceId:String,
    mPersonName:String,
    mPersonAge:Number,
    mPersonPic:String,
    mPersonDescription:String
});
let MissingPersons= mongoose.model('mperson',missingPersonSchema);
module.exports=MissingPersons;