import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';

const app = express();
app.use(cors());
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/amazona', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.get("/", (req, res) => {
    res.send("Server is working...");
});

app.use((error, req, res, next) => {
    res.status(500).send({ message: error.message });
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});