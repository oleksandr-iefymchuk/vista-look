import express from 'express';
import swaggerUi from 'swagger-ui-express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import { apiEndpoints } from './constants.js';
import { swaggerSpec } from './swaggerOptions.js';
import productsRouter from './routes/products.js';
import reviewsRouter from './routes/reviews.js';
import usersRouter from './routes/users.js';
import ordersRouter from './routes/orders.js';
import helmet from 'helmet';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const uri = 'mongodb+srv://bizmailer24:nybcc1HA77rVDnic@cluster0.f97rpqg.mongodb.net/vista-look';

mongoose
  .connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log(error));

app.use(apiEndpoints.PRODUCTS, productsRouter);
app.use(apiEndpoints.REVIEWS, reviewsRouter);
app.use(apiEndpoints.USERS, usersRouter);
app.use(apiEndpoints.ORDERS, ordersRouter);

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'https://stats.g.doubleclick.net'],
      connectSrc: ["'self'", 'https://stats.g.doubleclick.net']
    }
  })
);

app.use('/', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

export default app;
