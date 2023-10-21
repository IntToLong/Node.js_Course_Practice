import express, { Application } from 'express';

import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from './swaggerConfig';

import routes from './routes/routes';
import errorHandler from './middleware/errorHandler';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc));

app.use(bodyParser.json());

app.use(routes);

app.use(errorHandler);

app.listen(PORT, (): void => {
  console.log(`Server is listening on port ${PORT}`);
});
