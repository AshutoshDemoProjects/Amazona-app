import express from 'express';
import cors from 'cors';
import data from './data.js';
const app = express();
app.use(cors());
app.get("/api/products", (req, res) => {
    res.send(data.Products);
});
app.get("/", (req, res) => {
    res.send("Server is working...");
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});