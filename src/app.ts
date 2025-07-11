import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import { loggerMiddleware } from '@middlewares/logger';
import { errorHandler } from '@middlewares/errorHandler';
import { swaggerUi, swaggerSpec } from '@docs/swagger';
import { createV1Router } from '@routes/index';

const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(loggerMiddleware);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/v1', createV1Router());

app.use(errorHandler);

export default app;
