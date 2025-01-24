import { Router } from 'express';
import cartManager from '../models/cartManager.js';

const router = Router();

// Ruta POST /carts: Crear un nuevo carrito
router.post('/', (req, res) => {
    const newCart = cartManager.createCart();
    res.status(201).json(newCart);
});

// Ruta GET /carts/:cid: Obtener los productos de un carrito
router.get('/:cid', (req, res) => {
    const cart = cartManager.getCartById(parseInt(req.params.cid));
    if (cart) {
        res.json(cart.products);
    } else {
        res.status(404).send('Carrito no encontrado');
    }
});

// Ruta POST /carts/:cid/product/:pid: Agregar producto al carrito
router.post('/:cid/product/:pid', (req, res) => {
    const cart = cartManager.addProductToCart(parseInt(req.params.cid), parseInt(req.params.pid));
    if (cart) {
        res.json(cart);
    } else {
        res.status(404).send('Carrito o producto no encontrado');
    }
});

export default router;
