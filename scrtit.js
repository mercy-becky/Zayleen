// script.js

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = parseFloat(localStorage.getItem("total")) || 0;

// Load existing cart on page load
updateCart();

function addToCart(itemName, itemPrice) {
  cart.push({ name: itemName, price: itemPrice });
  total += itemPrice;

  saveCart();
  updateCart();
}

function removeFromCart(index) {
  total -= cart[index].price;
  cart.splice(index, 1);
  
  saveCart();
  updateCart();
}

function clearCart() {
  cart = [];
  total = 0;
  localStorage.removeItem("cart");
  localStorage.removeItem("total");
  updateCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("total", total.toFixed(2));
}

function updateCart() {
  const cartContainer = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");

  cartContainer.innerHTML = "";

  cart.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";

    cartItem.innerHTML = `
      <p class="cart-item-name">${item.name} - ksh ${item.price}</p>
      <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
    `;

    cartContainer.appendChild(cartItem);
  });

  totalEl.textContent = total.toFixed(2);
}
