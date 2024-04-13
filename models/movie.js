const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

// Define schema for the Movies model
const MoviesSchema = new Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, trim: true },
  trailerUrl: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  content: { type: String, required: true, trim: true },
  thumbnail: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  director: { type: String, required: true, trim: true },
  actor: { type: String, required: true, trim: true },
  language: { type: String, required: true, trim: true },
  publish: { type: String, required: true, trim: true },
  censorship: { type: String, required: true, trim: true },
  duration: { type: String, required: true, trim: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  reviewPoint: { type: Number, default: 0 },
  createdBy: { type: String, trim: true },
  createdAt: { type: Date, trim: true },
});

// Method to convert the document to a JSON object
MoviesSchema.methods.toJSON = function() {
  const obj = this.toObject();
  const allowFields = [
    '_id',
    'name',
    'slug',
    'thumbnail',
    'description',
    'content',
    'category',
    'trailerUrl',
    'director',
    'actor',
    'language',
    'publish',
    'censorship',
    'startTime',
    'endTime',
    'reviewPoint',
    'createdBy',
    'createdAt',
  ];
  const returnObject = {};
  allowFields.forEach((key) => {
    if (key === '_id') key = '_id';
    returnObject[key] = obj[key];
  });
  return returnObject;
};
MoviesSchema.plugin(mongoosePaginate);

// Create the Movies model from the schema and export it
const Movies = mongoose.model('movies', MoviesSchema);
module.exports = Movies;