import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
//routes
import authRoutes from './routes/authRoutes.js'
import debtorRoutes from './routes/debtorRoutes.js'
import debtRoutes from './routes/debtRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import dashboardRoutes from './routes/dashboardRoutes.js'

//connect to db
import connectDb from './config/db.js'

const PORT = process.env.PORT || 3000
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
}

dotenv.config();

//connect to database
connectDb();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

//routes
app.use('/api/auth', authRoutes);
app.use('/api/debtors', debtorRoutes);
app.use('/api/debts', debtRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.listen(PORT,()=>{
    console.log('Server running on port ', PORT)
});