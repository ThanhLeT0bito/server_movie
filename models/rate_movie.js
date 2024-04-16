const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Định nghĩa schema cho model RateMovie
const rateMovieSchema = new Schema({
    movieId: String,
    userId: String, // Thêm trường userId
    rate: Number,
    comment: String
});

// Phương thức tạo đối tượng RateMovie từ req.body
rateMovieSchema.statics.createFromRequestBody = function(body) {
    return new this({
        movieId: body.movieId,
        userId: body.userId, // Thêm userId vào đối tượng RateMovie
        rate: body.rate,
        comment: body.comment
    });
};

// Tạo model RateMovie từ schema và export nó
const RateMovie = mongoose.model('rateMovies', rateMovieSchema);
module.exports = RateMovie;
