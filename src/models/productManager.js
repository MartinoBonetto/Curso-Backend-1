import fs from 'fs';
const path = './data/products.json';

class ProductManager {
    constructor() {
        this.products = this._loadProducts();
    }

    _loadProducts() {
        try {
            return JSON.parse(fs.readFileSync(path, 'utf-8'));
        } catch (error) {
            return [];
        }
    }

    _saveProducts() {
        fs.writeFileSync(path, JSON.stringify(this.products, null, 2));
    }

    getAllProducts() {
        return this.products;
    }

    getProductById(pid) {
        return this.products.find(product => product.id === pid);
    }

    addProduct(product) {
        const newProduct = { ...product, id: this._generateId() };
        this.products.push(newProduct);
        this._saveProducts();
        return newProduct;
    }

    updateProduct(pid, updatedProduct) {
        const index = this.products.findIndex(product => product.id === pid);
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...updatedProduct };
            this._saveProducts();
            return this.products[index];
        }
        return null;
    }

    deleteProduct(pid) {
        const index = this.products.findIndex(product => product.id === pid);
        if (index !== -1) {
            const deletedProduct = this.products.splice(index, 1);
            this._saveProducts();
            return deletedProduct[0];
        }
        return null;
    }

    _generateId() {
        return this.products.length ? Math.max(...this.products.map(product => product.id)) + 1 : 1;
    }
}

export default new ProductManager();
