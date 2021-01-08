import express from 'express';
import cors from 'cors';
import data from './data.js';
const app = express();
app.use(cors());
app.get("/api/products", (req, res) => {
    res.send(data.Products);
});
app.get("/api/products/:id", (req, res) => {
    const product = data.Products.find(x => x._id == req.params.id);
    if (product)
        res.send(product);
    else
        res.status(404).send({ message: 'Product Not Found' });
});
app.get("/", (req, res) => {
    res.send("Server is working...");
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});