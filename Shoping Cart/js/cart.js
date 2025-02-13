document.addEventListener("DOMContentLoaded", () => {
    displayCart();
});

function displayCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartList = document.getElementById("cart-list");
    const cartTotalValue = document.getElementById("cart-total-value");
    const cartTotalItems = document.getElementById("cart-total-items");

    cartList.innerHTML = ""; // Clear previous cart items
    let total = 0;
    let totalItems = 0;

    cart.forEach((product, index) => {
        const itemTotal = product.price * product.quantity;
        total += itemTotal;
        totalItems += product.quantity;

        const cartItem = document.createElement("div");
        cartItem.classList.add("flex", "justify-between", "items-center", "border-b", "py-4");

        cartItem.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="w-16 h-16 object-cover rounded">
            <div class="flex-1 ml-4">
                <h3 class="text-lg font-semibold">${product.title}</h3>
                <p class="text-gray-600">$${product.price} x ${product.quantity}</p>
                <p class="text-gray-600 font-semibold">Item Total: $${itemTotal.toFixed(2)}</p>
            </div>
            <div class="flex items-center space-x-2">
                <button onclick="updateQuantity(${index}, 'decrease')" class="bg-gray-300 px-2 rounded">-</button>
                <span>${product.quantity}</span>
                <button onclick="updateQuantity(${index}, 'increase')" class="bg-gray-300 px-2 rounded">+</button>
            </div>
            <button onclick="removeFromCart(${index})" class="text-red-500">Remove</button>
        `;

        cartList.appendChild(cartItem);
    });

    // Display the total quantity of items and the overall cart value
    cartTotalValue.innerText = `$${total.toFixed(2)}`;
    cartTotalItems.innerText = totalItems;
}

   // Function to update quantity

function updateQuantity(index, action) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (action === "increase") {
        cart[index].quantity++;
    } else if (action === "decrease" && cart[index].quantity > 1) {
        cart[index].quantity--;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

// Function to remove a single item from the cart

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

// ✅ Function to clear the entire cart
function clearCart() {
    localStorage.removeItem("cart");
    displayCart(); // Refresh UI after clearing cart
}