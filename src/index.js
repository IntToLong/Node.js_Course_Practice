const express = require('express');
const app = express();
const PORT = 3000;
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('./swaggerConfig');
const routes = require('./routes/routes');


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc));
app.use(routes);

// app.get('/health-check', (req, res) => {
// 	res.json({server: `Server is running on port ${PORT}`});
// });

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});