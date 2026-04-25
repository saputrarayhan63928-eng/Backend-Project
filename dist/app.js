import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import path from 'node:path';
import productRouter from './routes/product.route.js';
import categoryRouter from './routes/category.route.js';
import userRouter from './routes/user.route.js';
import orderRouter from './routes/order.route.js';
import authRouter from './routes/auth.route.js';
import borrowRouter from './routes/borrow.route.js';
import borrowingRouter from './routes/borrowing.route.js';
import adminRouter from './routes/admin.route.js';
import { openApiSpec } from './docs/openapi.js';
import { swaggerUiHtml } from './docs/swagger.ui.js';
import { errorHandler } from './middlewares/error.handler.js';
const app = express();
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/public', express.static(path.join(process.cwd(), 'public')));
app.get('/', (_req, res) => {
    res.json({ message: 'Library API is running' });
});
app.get('/openapi.json', (_req, res) => {
    res.json(openApiSpec);
});
app.get('/api-docs', (_req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(swaggerUiHtml);
});
app.get('/docs', (_req, res) => {
    res.redirect('/api-docs');
});
app.use('/api/products', productRouter);
app.use('/api/books', productRouter);
app.use('/books', productRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/auth', authRouter);
app.use('/auth', authRouter);
app.use('/api/borrows', borrowRouter);
app.use('/api/borrow-records', borrowRouter);
app.use('/borrow-records', borrowRouter);
app.use('/', borrowingRouter);
app.use('/api/admin', adminRouter);
app.use('/admin', adminRouter);
app.use(errorHandler);
export default app;
//# sourceMappingURL=app.js.map