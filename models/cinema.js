const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cinemaSchema = new Schema({
    name: String,
    location: String,
    brand: String
});

// Phương thức tạo đối tượng Cinema từ req.body
cinemaSchema.statics.createFromRequestBody = function(body) {
    return new this({
        name: body.name,
        location: body.location,
        brand: body.brand
    });
};

const Cinema = mongoose.model('Cinema', cinemaSchema);
module.exports = Cinema;
