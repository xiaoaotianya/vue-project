var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var schema = new mongoose.Schema({
    fieldname:String,
    originalname:String,
    encoding:String,
    mimetype: String,
    destination:String,
    filename:String,
    path:String,
    size:Number,
    cate:String
    // date: { type: Date, default: Date.now },
});

schema.plugin(mongoosePaginate);

module.exports =  mongoose.model('Upload',  schema); // Model.paginate()