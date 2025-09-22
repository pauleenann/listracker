import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
//routes
import authRoutes from './routes/authRoutes.js'

const PORT = process.env.PORT || 3000
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
}

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

//routes
app.use('/api/auth',authRoutes)

app.listen(PORT,()=>{
    console.log('Server running on port ', PORT)
})