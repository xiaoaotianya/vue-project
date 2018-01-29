var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');


var schema = new mongoose.Schema({
    title:String,
    author:String,
    type:String,
    content:String,  
    date: { type: Date, default: Date.now }

});

schema.plugin(mongoosePaginate);

module.exports =  mongoose.model('News',  schema); // Model.paginate()