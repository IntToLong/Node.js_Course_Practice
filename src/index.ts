// import express, { Application } from 'express';
// import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';

import swaggerJsdoc from './swaggerConfig';
import constants from './constants';
// import movieRoute from './routes/movie.route';
// import genreRoute from './routes/genre.route';
import errorHandler from './middleware/errorHandler';
import connectDB from './db/config';
import createServer from './utils/server';

const app = createServer();

connectDB();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc));


app.use(errorHandler);

export const server = app.listen(constants.PORT, (): void => {
  console.log(`Server is listening on port ${constants.PORT}`);
});
