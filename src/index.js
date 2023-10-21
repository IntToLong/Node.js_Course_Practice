const express = require('express');
const app = express();
const PORT = 3000;
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('./swaggerConfig');
const routes = require('./routes/routes');
const errorHandler = require('./middleware/errorHandler');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc));
app.use(routes);

app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
