import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import productRouter from './routes/product.route'
import categoryRouter from './routes/category.route'
import userRouter from './routes/user.route'
import orderRouter from './routes/order.route'
import authRouter from './routes/auth.route'
import { errorHandler } from './middlewares/error.handler'

const app = express()

app.use(helmet())
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.use((req,res,next) =>{
    req.startTime = Date.now()
    const apiKey = req.headers['x-api-key'] as string
    if(!apiKey) return res.status(401).json({success: false, message: 'Kirim header X-API-Key'})
    req.apiKey = apiKey
    next()
})

app.get('/', (req,res) => {
    const waktu = Date.now() - (req.startTime || 0)
    res.json({message: `Halo pemilik API Key: ${req.apiKey}! Hari 5 – MVC E-Commerce + Service`, waktu_proses: `${waktu}ms`})
})

app.use('/api/products', productRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/users', userRouter)
app.use('/api/orders', orderRouter)
app.use('/api/auth', authRouter)

app.use(errorHandler)

export default app
