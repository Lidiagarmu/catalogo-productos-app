document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');

    // Cargar todos los productos al inicio
    fetch(`/api/products`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la red');
            }
            return response.json();
        })
        .then(data => {
            displayProducts(data); // Mostrar todos los productos
            setupFilters(data); // Configurar filtros
        })
        .catch(error => {
            console.error('Hubo un problema con la solicitud Fetch:', error);
        });
});

// Función para mostrar los productos en la página
function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Limpiar la lista de productos

    if (products.length === 0) {
        productList.innerHTML = '<p>No se encontraron productos.</p>';
        return;
    }

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <h2>${product.name}</h2>
            <p>Categoría: ${product.category}</p>
            <p>Precio: $${product.price.toFixed(2)}</p>
        `;
        productList.appendChild(productDiv);
    });
}

// Configurar los filtros
function setupFilters(products) {
    const nameFilter = document.getElementById('name-filter');
    const categoryFilter = document.getElementById('category-filter');
    const minPriceFilter = document.getElementById('min-price-filter');
    const maxPriceFilter = document.getElementById('max-price-filter');

    // Filtrar productos cuando los valores de los filtros cambian
    nameFilter.addEventListener('input', () => filterProducts(products));
    categoryFilter.addEventListener('input', () => filterProducts(products));
    minPriceFilter.addEventListener('input', () => filterProducts(products));
    maxPriceFilter.addEventListener('input', () => filterProducts(products));
}

// Función para filtrar productos
function filterProducts(products) {
    const nameFilter = document.getElementById('name-filter').value.toLowerCase();
    const categoryFilter = document.getElementById('category-filter').value.toLowerCase();
    const minPriceFilter = parseFloat(document.getElementById('min-price-filter').value) || 0;
    const maxPriceFilter = parseFloat(document.getElementById('max-price-filter').value) || Infinity;

    const filteredProducts = products.filter(product => {
        const matchesName = product.name.toLowerCase().includes(nameFilter);
        const matchesCategory = product.category.toLowerCase().includes(categoryFilter);
        const matchesPrice = product.price >= minPriceFilter && product.price <= maxPriceFilter;

        return matchesName && matchesCategory && matchesPrice;
    });

    displayProducts(filteredProducts); // Mostrar los productos filtrados
}
