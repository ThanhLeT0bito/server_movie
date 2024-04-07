const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Định nghĩa schema cho model Order
const orderSchema = new Schema({
    movieId: String,
    dateMovie: String,
    timeMovie: String,
    section: Number,
    seats: String,
    prices: Number,
    nameCinema: String,
    locationCinema: String,
});

// Phương thức tạo đối tượng Order từ req.body
orderSchema.statics.createFromRequestBody = function(body) {
    return new this({
        movieId: body.movieId,
        dateMovie: body.dateMovie,
        timeMovie: body.timeMovie,
        section: body.section,
        seats: body.seats,
        prices: body.prices,
        nameCinema: body.nameCinema,
        locationCinema: body.locationCinema,
    });
};

// Tạo model Order từ schema và export nó
const Order = mongoose.model('orders', orderSchema);
module.exports = Order;
