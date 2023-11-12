import express, { Application } from 'express';
import bodyParser from 'body-parser';
import movieRoute from '../routes/movie.route';
import genreRoute from '../routes/genre.route';

const createServer = () => {
  const app: Application = express();
  app.use(bodyParser.json());
  app.use(genreRoute);
  app.use(movieRoute);
  return app;
};

export default createServer;
