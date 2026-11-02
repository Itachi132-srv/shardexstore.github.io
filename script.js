const 03343498141 = ""; 
// Apna WhatsApp number yahan likho, e.g. 923001234567

const productsData = [
    {id:1,name:"50 Robux",category:"roblox",image:"robux.png",description:"Roblox Robux package",price:198,usd:"$0.70"},
    {id:2,name:"100 Robux",category:"roblox",image:"robux.png",description:"Roblox Robux package",price:396,usd:"$1.40"},
    {id:3,name:"200 Robux",category:"roblox",image:"robux.png",description:"Roblox Robux package",price:792,usd:"$2.80"},
    {id:4,name:"300 Robux",category:"roblox",image:"robux.png",description:"Roblox Robux package",price:1188,usd:"$4.20"},
    {id:5,name:"500 Robux",category:"roblox",image:"robux.png",description:"Roblox Robux package",price:1980,usd:"$7.00"},
    {id:6,name:"1000 Robux",category:"roblox",image:"robux.png",description:"Roblox Robux package",price:3960,usd:"$14.01"},

    {id:7,name:"Minecraft Pocket Edition",category:"minecraft",image:"mcpocket.png",description:"Minecraft PE for Android",price:300,usd:"$1.06"},
    {id:8,name:"Minecraft Java Edition",category:"minecraft",image:"mcjava.png",description:"Minecraft Java Edition",price:0,usd:"Coming Soon",comingSoon:true},
    {id:9,name:"Minecraft Dungeons",category:"minecraft",image:"mcdouengen.png",description:"Minecraft Dungeons",price:0,usd:"Coming Soon",comingSoon:true},

    {id:10,name:"Free Fire Diamonds",category:"freefire",image:"diamonds.png",description:"Free Fire diamond top-up",price:0,usd:"Price Soon",comingSoon:true},
    {id:11,name:"Weekly Membership",category:"freefire",image:"weeklymembership.png",description:"Free Fire weekly membership",price:0,usd:"Price Soon",comingSoon:true},
    {id:12,name:"Monthly Membership",category:"freefire",image:"monthlymembership.png",description:"Free Fire monthly membership",price:0,usd:"Price Soon",comingSoon:true},
    {id:13,name:"Level Pass",category:"freefire",image:"levelpass.png",description:"Free Fire level pass",price:0,usd:"Price Soon",comingSoon:true}
];

let cart = [];

function renderProducts(category = "all") {
    const container = document.getElementById("products");

    const filtered = category === "all"
        ? productsData
        : productsData.filter(product => product.category === category);

    container.innerHTML = filtered.map(product => `
        <div class="product-card">
            <img src="${product.image}" class="product-image"
                 alt="${product.name}" onerror="this.style.display='none'">

            <h3>${product.name}</h3>
            <p>${product.description}</p>

            <div class="price">
                <span class="pkr">
                    ${product.comingSoon ? "Coming Soon" : product.price + " PKR"}
                </span>
                <span class="usd">${product.usd}</span>
            </div>

            <button class="buy-btn"
                ${product.comingSoon ? "disabled" : ""}
                onclick="addToCart(${product.id})">
                ${product.comingSoon ? "Coming Soon" : "Add to Cart"}
            </button>
        </div>
    `).join("");
}

function filterProducts(category, button) {
    document.querySelectorAll(".category-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");
    renderProducts(category);
}

function addToCart(id) {
    const product = productsData.find(item => item.id === id);
    if (!product || product.comingSoon) return;

    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({...product, quantity: 1});
    }

    updateCart();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

function updateCart() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById("cartCount").textContent = count;

    const container = document.getElementById("cartItems");

    if (cart.length === 0) {
        container.innerHTML = `<div class="empty-cart">Your cart is empty.</div>`;
    } else {
        container.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong><br>
                    ${item.quantity} × ${item.price} PKR
                </div>

                <button class="remove-btn" onclick="removeFromCart(${item.id})">
                    Remove
                </button>
            </div>
        `).join("");
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    document.getElementById("cartTotal").textContent = total + " PKR";
}

function openCart() {
    document.getElementById("cartPanel").style.display = "flex";
}

function closeCart() {
    document.getElementById("cartPanel").style.display = "none";
}

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
        message += `${item.name} × ${item.quantity} = ${item.price * item.quantity} PKR\n`;
    });

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    message += `\nTotal: ${total} PKR`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
}

renderProducts();
updateCart();
