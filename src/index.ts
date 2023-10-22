import express, { Application } from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';

import swaggerJsdoc from './swaggerConfig';
import constants from './constants';
import movieRoute from './routes/movie.route';
import genreRoute from './routes/genre.route';
import errorHandler from './middleware/errorHandler';
import connectDB from './db/config';

const app: Application = express();

connectDB();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc));

app.use(bodyParser.json());

app.use('/movies', genreRoute);
app.use(movieRoute);

app.use(errorHandler);

app.listen(constants.PORT, (): void => {
  console.log(`Server is listening on port ${constants.PORT}`);
});
