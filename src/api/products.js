import { Router } from 'express';
import productManager from '../models/productManager.js';

const router = Router();

// Ruta GET /products: Listar todos los productos
router.get('/', (req, res) => {
    res.json(productManager.getAllProducts());
});

// Ruta GET /products/:pid: Obtener producto por ID
router.get('/:pid', (req, res) => {
    const product = productManager.getProductById(parseInt(req.params.pid));
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

// Ruta POST /products: Agregar un nuevo producto
router.post('/', (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;
    if (!title || !description || !code || !price || !status || !stock || !category || !thumbnails) {
        return res.status(400).send('Faltan datos');
    }
    const newProduct = productManager.addProduct({ title, description, code, price, status, stock, category, thumbnails });
    res.status(201).json(newProduct);
});

// Ruta PUT /products/:pid: Actualizar un producto
router.put('/:pid', (req, res) => {
    const updatedProduct = productManager.updateProduct(parseInt(req.params.pid), req.body);
    if (updatedProduct) {
        res.json(updatedProduct);
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

// Ruta DELETE /products/:pid: Eliminar un producto
router.delete('/:pid', (req, res) => {
    const deletedProduct = productManager.deleteProduct(parseInt(req.params.pid));
    if (deletedProduct) {
        res.json(deletedProduct);
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

export default router;
