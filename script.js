
"use strict";

// Apna WhatsApp number country code ke sath likho.
// Example: 923001234567
const +92 3208193996 = "";

const productsData = [
    {
        id: 1,
        name: "50 Robux",
        category: "roblox",
        image: "robux.png",
        description: "Roblox Robux package",
        price: 198,
        usd: "$0.70"
    },
    {
        id: 2,
        name: "100 Robux",
        category: "roblox",
        image: "robux.png",
        description: "Roblox Robux package",
        price: 396,
        usd: "$1.40"
    },
    {
        id: 3,
        name: "200 Robux",
        category: "roblox",
        image: "robux.png",
        description: "Roblox Robux package",
        price: 792,
        usd: "$2.80"
    },
    {
        id: 4,
        name: "300 Robux",
        category: "roblox",
        image: "robux.png",
        description: "Roblox Robux package",
        price: 1188,
        usd: "$4.20"
    },
    {
        id: 5,
        name: "500 Robux",
        category: "roblox",
        image: "robux.png",
        description: "Roblox Robux package",
        price: 1980,
        usd: "$7.00"
    },
    {
        id: 6,
        name: "1000 Robux",
        category: "roblox",
        image: "robux.png",
        description: "Roblox Robux package",
        price: 3960,
        usd: "$14.01"
    },

    {
        id: 7,
        name: "Minecraft Pocket Edition",
        category: "minecraft",
        image: "mcpocket.png",
        description: "Minecraft PE for Android",
        price: 300,
        usd: "$1.06"
    },
    {
        id: 8,
        name: "Minecraft Java Edition",
        category: "minecraft",
        image: "mcjava.png",
        description: "Minecraft Java Edition",
        price: 0,
        usd: "Coming Soon",
        comingSoon: true
    },
    {
        id: 9,
        name: "Minecraft Dungeons",
        category: "minecraft",
        image: "mcdouengen.png",
        description: "Minecraft Dungeons",
        price: 0,
        usd: "Coming Soon",
        comingSoon: true
    },

    {
        id: 10,
        name: "Free Fire Diamonds",
        category: "freefire",
        image: "diamonds.png",
        description: "Free Fire diamond top-up",
        price: 0,
        usd: "Price Soon",
        comingSoon: true
    },
    {
        id: 11,
        name: "Weekly Membership",
        category: "freefire",
        image: "weeklymembership.png",
        description: "Free Fire weekly membership",
        price: 0,
        usd: "Price Soon",
        comingSoon: true
    },
    {
        id: 12,
        name: "Monthly Membership",
        category: "freefire",
        image: "monthlymembership.png",
        description: "Free Fire monthly membership",
        price: 0,
        usd: "Price Soon",
        comingSoon: true
    },
    {
        id: 13,
        name: "Level Pass",
        category: "freefire",
        image: "levelpass.png",
        description: "Free Fire level pass",
        price: 0,
        usd: "Price Soon",
        comingSoon: true
    }
];

let cart = [];
let currentCategory = "all";

// Render products
function renderProducts(category = "all") {
    const container = document.getElementById("products");

    if (!container) {
        console.error("Products container #products not found in HTML.");
        return;
    }

    const filteredProducts = category === "all"
        ? productsData
        : productsData.filter(product => product.category === category);

    if (filteredProducts.length === 0) {
        container.innerHTML = `<p class="empty-products">No products found.</p>`;
        return;
    }

    container.innerHTML = filteredProducts.map(product => {
        const priceText = product.comingSoon
            ? "Coming Soon"
            : `${product.price.toLocaleString()} PKR`;

        const buttonText = product.comingSoon
            ? "Coming Soon"
            : "Add to Cart";

        return `
            <div class="product-card">
                <img
                    src="${product.image}"
                    class="product-image"
                    alt="${product.name}"
                    onerror="this.onerror=null; this.src=''; this.style.display='none';"
                >

                <h3>${product.name}</h3>
                <p>${product.description}</p>

                <div class="price">
                    <strong>${priceText}</strong>
                    <small>${product.usd}</small>
                </div>

                <button
                    class="buy-btn"
                    ${product.comingSoon ? "disabled" : ""}
                    onclick="addToCart(${product.id})"
                >
                    ${buttonText}
                </button>
            </div>
        `;
    }).join("");
}

// Category filter
function filterProducts(category, button) {
    currentCategory = category;

    document.querySelectorAll(".category-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    if (button) {
        button.classList.add("active");
    }

    renderProducts(currentCategory);
}

// Add product to cart
function addToCart(id) {
    const product = productsData.find(item => item.id === id);

    if (!product || product.comingSoon) {
        return;
    }

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
}

// Change quantity
function changeQuantity(id, change) {
    const item = cart.find(product => product.id === id);

    if (!item) {
        return;
    }

    item.quantity += change;

    if (item.quantity <= 0) {
        removeFromCart(id);
        return;
    }

    updateCart();
}

// Remove item
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// Update cart display and total
function updateCart() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);

    document.getElementById("cartCount").textContent = count;

    const cartItems = document.getElementById("cartItems");

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">Your cart is empty.</div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div>
                    <div class="cart-item-name">${item.name}</div>

                    <div class="cart-item-price">
                        ${item.price.toLocaleString()} PKR each
                    </div>

                    <button
                        class="remove-btn"
                        onclick="removeFromCart(${item.id})"
                    >
                        Remove
                    </button>
                </div>

                <div class="quantity-controls">
                    <button onclick="changeQuantity(${item.id}, -1)">−</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
        `).join("");
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    document.getElementById("cartTotal").textContent =
        total.toLocaleString() + " PKR";
}

// Open cart
function openCart() {
    document.getElementById("cartOverlay").classList.add("show");
}

// Close cart
function closeCart() {
    document.getElementById("cartOverlay").classList.remove("show");
}

// Close cart by clicking outside
function overlayClick(event) {
    if (event.target.id === "cartOverlay") {
        closeCart();
    }
}

// WhatsApp checkout
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    if (!WHATSAPP_NUMBER) {
        alert("Please add your WhatsApp number in script.js first.");
        return;
    }

    let message = "Hello Shardex Store! I want to place an order:\n\n";

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;

        message += `${item.name} x ${item.quantity} = ${itemTotal.toLocaleString()} PKR\n`;
    });

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    message += `\nTotal: ${total.toLocaleString()} PKR`;

    const whatsappURL =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank");
}

// Initial render
document.addEventListener("DOMContentLoaded", function () {
    renderProducts("all");
    updateCart();
});
