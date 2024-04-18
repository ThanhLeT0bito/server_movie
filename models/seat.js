const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Định nghĩa schema cho model Seat
const seatSchema = new Schema({
    movieId: String,
    reserved: String,
    service: String // seccion
});

// Phương thức tạo đối tượng Seat từ req.body
seatSchema.statics.createFromRequestBody = function(body) {
    return new this({
        movieId: body.movieId,
        reserved: body.reserved,
        service: body.service
    });
};

// Tạo model Seat từ schema và export nó
const Seat = mongoose.model('seats', seatSchema);
module.exports = Seat;
