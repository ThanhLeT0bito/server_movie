const Movie = require("../models/movie");

exports.findMoviesWithPagination = async (findParams, options) => {
  return Movie.paginate(findParams, options);
};

exports.findAllMovies = async () => {
  return Movie.find({ _deleted: { $ne: true } }).sort({ createdAt: -1 });
};

exports.findMovie = async (conditions) => {
  return Movie.findOne({ $or: conditions });
};

exports.createMovie = async (movieData) => {
  const newMovie = new Movie(movieData);
  return newMovie.save();
};

exports.findMovieById = async (movieId) => {
  return Movie.findById(movieId);
};

exports.updateMovieById = async (movieId, movieData) => {
  return Movie.findByIdAndUpdate(movieId, movieData, { new: true });
};

exports.deleteMovieById = async (movieId) => {
  return Movie.findByIdAndDelete(movieId);
};