const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, required: true },
    category_id:{type: Schema.Types.ObjectId,ref:'Category',required:true},
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now }
});
schema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('Product', schema);