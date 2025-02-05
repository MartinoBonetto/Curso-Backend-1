import express from 'express';
import { engine } from 'express-handlebars';
import http from 'http';
import { Server } from 'socket.io';
import productsRouter from './src/api/products.js';
import cartsRouter from './src/api/carts.js';
import productManager from './src/models/productManager.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Configuracion HandLebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

//resive archivos estaticos
app.use(express.static('public'));
app.use(express.json()); // Middleware para parsear JSON

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

//ruta para mostrar archivos staticos
app.get('/realtimeproducts', (req, res) => {
    const products = productManager.getAllProducts();
    res.render('realTimeProducts', { products });
});

// conexion webSocket
io.on('connection', (socket) => {
    console.log('Usuario conectado');

    // Envio de productos (usuario conectado)
    socket.emit('productList', productManager.getAllProducts());
    
    // Escuchar cuando el cliente agrega un producto
    socket.on('addProduct', (product) => {
        productManager.addProduct(product);
        io.emit('productList', productManager.getAllProducts());
    });

    // Escuchar cuando el cliente elimina un producto
    socket.on('deleteProduct', (productId) => {
        productManager.deleteProduct(productId);
        io.emit('productList', productManager.getAllProducts());
    });

    socket.io('disconnect', () => {
        console.log("Usuario desconectado");
    });
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});
