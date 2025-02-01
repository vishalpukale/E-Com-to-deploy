import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';


//utils
import connectDb from './config/db.js';
import userRoutes from './routes/userRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js';
import productsRoutes from './routes/productsRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import ordersRoutes from './routes/orderRoutes.js'

dotenv.config();
const port = process.env.PORT;

connectDb();


const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())



// including routes
app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", ordersRoutes);


app.get('/api/config/paypal', (req, res)=> {
    res.send({clientId: process.env.PAYPAL_CLIENT_ID})
})


const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname + '/uploads')))

app.listen(port, ()=>{
    `Server running on port ${port}`
})