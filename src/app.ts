import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import path from 'node:path'
import productRouter from './routes/product.route'
import categoryRouter from './routes/category.route'
import userRouter from './routes/user.route'
import orderRouter from './routes/order.route'
import authRouter from './routes/auth.route'
import borrowRouter from './routes/borrow.route'
import borrowingRouter from './routes/borrowing.route'
import { errorHandler } from './middlewares/error.handler'

const app = express()

app.use(helmet())
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use('/public', express.static(path.join(process.cwd(), 'public')))

app.get('/', (_req,res) => {
    res.json({message: 'Library API is running'})
})

app.use('/api/products', productRouter)
app.use('/api/books', productRouter)
app.use('/books', productRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/users', userRouter)
app.use('/api/orders', orderRouter)
app.use('/api/auth', authRouter)
app.use('/auth', authRouter)
app.use('/api/borrows', borrowRouter)
app.use('/', borrowingRouter)

app.use(errorHandler)

export default app
