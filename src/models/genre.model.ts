import mongoose from 'mongoose';

const GenreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const GenreModel = mongoose.model('Genre', GenreSchema);

export default GenreModel;
