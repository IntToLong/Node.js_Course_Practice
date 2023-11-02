import { Schema, model } from 'mongoose';
interface IMovie {
  title: string;
  description: string;
  releaseDate: Date;
  genre: string[];
}

const MovieSchema = new Schema<IMovie>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  genre: {
    type: [String],
    required: true,
  },
});

const Movie = model<IMovie>('Movie', MovieSchema);

export default Movie;
