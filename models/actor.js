const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Định nghĩa schema cho model Actor
const actorSchema = new Schema({
    name: String,
    images: String
});

actorSchema.statics.createFromRequestBody = function(body) {
    return new this({
        name: body.name,
        images: body.images
    });
};

// Tạo model Actor từ schema và export nó
const Actor = mongoose.model('actors', actorSchema);
module.exports = Actor;