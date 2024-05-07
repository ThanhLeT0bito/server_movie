const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Định nghĩa schema cho model RateMovie
const rateMovieSchema = new Schema({
    movieId: String,
    userId: String, // Thêm trường userId
    rate: Number,
    comment: String,
    createdAt: Date,
});

// Phương thức tạo đối tượng RateMovie từ req.body
rateMovieSchema.statics.createFromRequestBody = function(body) {
    return new this({
        movieId: body.movieId,
        userId: body.userId,
        rate: body.rate,
        comment: body.comment,
        createdAt: new Date() // Thêm trường createdAt với giá trị là thời gian hiện tại
    });
};

// Tạo model RateMovie từ schema và export nó
const RateMovie = mongoose.model('rateMovies', rateMovieSchema);
module.exports = RateMovie;
