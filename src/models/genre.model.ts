import { Schema, model } from 'mongoose';

export interface IGenre {
  name: string;
}

const GenreSchema = new Schema<IGenre>({
  name: {
    type: String,
    required: true,
  },
});

const Genre = model<IGenre>('Genre', GenreSchema);

export default Genre;
