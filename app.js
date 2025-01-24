import express from 'express';
import productsRouter from './src/api/products.js';
import cartsRouter from './src/api/carts.js';

const app = express();

app.use(express.json()); // Middleware para parsear JSON

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});
