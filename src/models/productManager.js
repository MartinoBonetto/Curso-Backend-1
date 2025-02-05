import fs from 'fs';
import path from 'path';

// Ruta al archivo donde se guardarán los productos
const productsFilePath = path.join('./data', 'products.json');

class ProductManager {
    constructor() {
        this.products = [];
        this.loadProducts();
    }

    // Cargar los productos desde el archivo JSON
    loadProducts() {
        try {
            if (fs.existsSync(productsFilePath)) {
                const data = fs.readFileSync(productsFilePath, 'utf-8');
                this.products = JSON.parse(data);
            }
        } catch (error) {
            console.error('Error al cargar los productos:', error);
        }
    }

    // Guardar los productos en el archivo JSON
    saveProducts() {
        try {
            fs.writeFileSync(productsFilePath, JSON.stringify(this.products, null, 2));
        } catch (error) {
            console.error('Error al guardar los productos:', error);
        }
    }

    // Obtener todos los productos
    getAllProducts() {
        return this.products;
    }

    // Obtener un producto por su ID
    getProductById(id) {
        return this.products.find(product => product.id === id);
    }

    // Agregar un nuevo producto
    addProduct(title, description, code, price, status, stock, category, thumbnails) {
        // Crear un nuevo producto
        const newProduct = {
            id: this.generateId(),
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails
        };
        this.products.push(newProduct);
        this.saveProducts();
        return newProduct;
    }

    // Actualizar un producto por ID
    updateProduct(id, updatedData) {
        const product = this.getProductById(id);
        if (product) {
            Object.assign(product, updatedData);
            this.saveProducts();
            return product;
        }
        return null;
    }

    // Eliminar un producto por ID
    deleteProduct(id) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex !== -1) {
            const deletedProduct = this.products.splice(productIndex, 1);
            this.saveProducts();
            return deletedProduct;
        }
        return null;
    }

    // Generar un ID único para los productos
    generateId() {
        return this.products.length ? Math.max(...this.products.map(product => product.id)) + 1 : 1;
    }
}

export default new ProductManager;

