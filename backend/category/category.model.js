const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
   name: { type: String, required: true },
    status: { type: Number },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now }
});
schema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('Category', schema);