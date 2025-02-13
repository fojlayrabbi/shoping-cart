// document.addEventListener("DOMContentLoaded", () => {
//     fetch("https://dummyjson.com/products")
//         .then(response => response.json())
//         .then(data => displayProducts(data.products))
//         .catch(error => console.error("Error fetching products:", error));
// });

// function displayProducts(products) {
//     const productList = document.getElementById("product-list");

//     productList.innerHTML = ""; // Clear any existing products

//     products.forEach(product => {
//         const productCard = document.createElement("div");
//         productCard.classList.add("bg-white", "shadow-md", "rounded-lg", "p-4", "text-center");

//         productCard.innerHTML = `
//             <img src="${product.thumbnail}" alt="${product.title}" class="w-full h-40 object-cover rounded">
//             <h3 class="text-lg font-semibold mt-2">${product.title}</h3>
//             <p class="text-gray-600">${product.description.substring(0, 50)}...</p>
//             <p class="text-xl font-bold text-blue-600">$${product.price}</p>
//             <button onclick="addToCart(${product.id}, '${product.title}', ${product.price}, '${product.thumbnail}')" 
//                 class="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
//                 Add to Cart
//             </button>
//         `;

//         productList.appendChild(productCard);
//     });
// }

// function addToCart(id, title, price, image) {
//     let cart = JSON.parse(localStorage.getItem("cart")) || [];

//     // Check if the product already exists in the cart
//     let existingProduct = cart.find(product => product.id === id);
    
//     if (existingProduct) {
//         existingProduct.quantity++;
//     } else {
//         cart.push({ id, title, price, image, quantity: 1 });
//     }

//     localStorage.setItem("cart", JSON.stringify(cart));
//     updateCartCount();
// }

// // Update Cart Count in Navbar
// function updateCartCount() {
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];
//     document.getElementById("cart-count").innerText = cart.length;
// }

document.addEventListener("DOMContentLoaded", () => {
    fetch("https://dummyjson.com/products")
        .then(response => response.json())
        .then(data => {
            window.productsData = data.products; // Store all products globally
            displayProducts(window.productsData);
        })
        .catch(error => console.error("Error fetching products:", error));
});

function displayProducts(products) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = ""; // Clear existing products

    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("bg-white", "shadow-md", "rounded-lg", "p-4", "text-center");

        productCard.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}" class="w-full h-40 object-cover rounded">
            <h3 class="text-lg font-semibold mt-2">${product.title}</h3>
            <p class="text-gray-600">${product.description.substring(0, 50)}...</p>
            <p class="text-xl font-bold text-blue-600">$${product.price}</p>
            <button onclick="addToCart(${product.id}, '${product.title}', ${product.price}, '${product.thumbnail}')" 
                class="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Add to Cart
            </button>
        `;

        productList.appendChild(productCard);
    });
}

// ✅ Function to filter products by name
function filterProducts() {
    const searchInput = document.getElementById("search-input").value.toLowerCase();
    const filteredProducts = window.productsData.filter(product =>
        product.title.toLowerCase().includes(searchInput)
    );

    displayProducts(filteredProducts);
}
