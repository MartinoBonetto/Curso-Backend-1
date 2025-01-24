import fs from 'fs';
const path = './data/carts.json';

class CartManager {
    constructor() {
        this.carts = this._loadCarts();
    }

    _loadCarts() {
        try {
            return JSON.parse(fs.readFileSync(path, 'utf-8'));
        } catch (error) {
            return [];
        }
    }

    _saveCarts() {
        fs.writeFileSync(path, JSON.stringify(this.carts, null, 2));
    }

    createCart() {
        const newCart = { id: this._generateId(), products: [] };
        this.carts.push(newCart);
        this._saveCarts();
        return newCart;
    }

    getCartById(cid) {
        return this.carts.find(cart => cart.id === cid);
    }

    addProductToCart(cid, pid) {
        const cart = this.getCartById(cid);
        if (cart) {
            const productIndex = cart.products.findIndex(item => item.product === pid);
            if (productIndex === -1) {
                cart.products.push({ product: pid, quantity: 1 });
            } else {
                cart.products[productIndex].quantity += 1;
            }
            this._saveCarts();
            return cart;
        }
        return null;
    }

    _generateId() {
        return this.carts.length ? Math.max(...this.carts.map(cart => cart.id)) + 1 : 1;
    }
}

export default new CartManager();
