var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var LabProductSchema = new Schema({

    author_id: { type: ObjectId , index:true },
    name:{type:String},
    sid:{type: String},
    html:{type:String},
    css:{type:String},
    js:{type:String},
    demoUrl:{type:String},
    resources:{type:Array},

    tags:{type: Array},

    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now }

});

mongoose.model('LabProduct', LabProductSchema);
