import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import router from './routes/userRoutes.js';
import adminRouter from './routes/adminRoutes.js';
import path from 'path';
import __dirname from './utils/getDirname.js';
import lawyerRouter from './routes/lawyerRoutes.js';
import modelRouter from './routes/modelRoutes.js';
import path from 'path';

//dotenv config
dotenv.config();

//mongodb connection
connectDB();

// rest object
const app = express();

//middlewares
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/api/v1/user', router);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/lawyer', lawyerRouter);
app.use('/api/v1/model', modelRouter);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use(express.static(path.join(__dirname, './client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

//port
const port = process.env.PORT || 8080;

//listen port
app.listen(port, ()=>{
})