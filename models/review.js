const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    movieId: String,
    userId: String,
    reviewParentId: { type: Schema.Types.ObjectId, ref: 'Review' },
    comment: String,
    love: Number,
    createdAt: { type: Date, default: Date.now } // Thêm trường createdAt kiểu Date
});

// Phương thức tạo đối tượng Review từ req.body
reviewSchema.statics.createFromRequestBody = function(body) {
    return new this({
        movieId: body.movieId,
        userId: body.userId,
        reviewParentId: body.reviewParentId,
        comment: body.comment,
        love: body.love,
        createdAt: new Date() // Thêm trường createdAt với giá trị là thời gian hiện tại
    });
};

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
