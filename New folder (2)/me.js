document.addEventListener("DOMContentLoaded", function () {
    let cart = [];
    const cartCount = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");
    const checkoutButton = document.getElementById("checkout");
    
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const product = this.parentElement;
            const id = product.getAttribute("data-id");
            const name = product.getAttribute("data-name");
            const price = parseFloat(product.getAttribute("data-price"));

            const existingItem = cart.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ id, name, price, quantity: 1 });
            }
            updateCart();
        });
    });

    function updateCart() {
        cartItems.innerHTML = "";
        let total = 0;
        cart.forEach(item => {
            const li = document.createElement("li");
            li.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
            cartItems.appendChild(li);
            total += item.price * item.quantity;
        });
        totalPrice.textContent = total.toFixed(2);
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    checkoutButton.addEventListener("click", function () {
        if (cart.length > 0) {
            alert("Thank you for your purchase! Your order has been placed.");
            cart = [];
            updateCart();
        } else {
            alert("Your cart is empty!");
        }
    });

    document.getElementById("login-form").addEventListener("submit", function (e) {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        if (username && password) {
            alert(`Welcome, ${username}! You are now logged in.`);
        } else {
            alert("Please enter valid login details.");
        }
    });
});
