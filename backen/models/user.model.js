var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');


var schema = new mongoose.Schema({
    name:String,
    password:String,
    mail:String,
    date: { type: Date, default: Date.now },
    gender:String,
    desc:String
});

schema.plugin(mongoosePaginate);

module.exports =  mongoose.model('User',  schema); // Model.paginate()