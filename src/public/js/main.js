const socket = io();

// Escuchar los productos que se reciben del servidor
socket.on('productList', (products) => {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.foreach(product => {
        const li = document.createElement('li');
        li.id = `product-${product.id}`;
        li.innerHTML = `${product.title} - $${product.price} 
                    <button onclick="deleteProduct(${product.id})">Eliminar</button>`;
        productList.appendChild(li);
    });
});

// enviar un nuevo producto al servidor
document.getElementById('add-product-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const newPrroduct = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
    };

    socket.emit('addProduct', newPrroduct);

    // Limpiar campos del formulario
    document.getElementById('title').value = '';
    document.getElementById('price').value = '';
});

// eliminar un producto
function deleteProduct(productId) {
    socket.emit('deleteProduct', productId);
}