var mongoose = require('mongoose');
var materializedPlugin = require('mongoose-materialized');


var schema = new mongoose.Schema({
   
    title: {type: String},
    type:{type:Number},
});

schema.plugin(materializedPlugin);

module.exports =  mongoose.model('Cate',  schema); // Model.paginate()