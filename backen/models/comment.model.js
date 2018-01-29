var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');


var schema = new mongoose.Schema({
    
    name:String,
    title:String,
    content:String, 
    date: { type: Date, default: Date.now },
    newsId:mongoose.Schema.ObjectId

    
});

schema.plugin(mongoosePaginate);

module.exports =  mongoose.model('Comment',  schema); // Model.paginate()