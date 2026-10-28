/* ==========================================================================
   L'ÉTOILE CAFÉ - INTERACTIVE ENGINE
   ========================================================================== */

// 1. Mock Menu Items Source
const MENU_ITEMS = [
    {
        id: 1,
        name: "Étoile Signature Pour-Over",
        category: "espresso",
        price: 6.50,
        desc: "Hand-poured single origin Ethiopia Yirgacheffe with notes of bergamot and jasmine.",
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 2,
        name: "Velvet Flat White",
        category: "espresso",
        price: 5.50,
        desc: "Double ristretto micro-foamed with organic whole milk or oat milk.",
        image: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 3,
        name: "24-Hour Nitro Cold Brew",
        category: "cold",
        price: 6.00,
        desc: "Slow-steeped micro-lot Guatemalan roast infused with pure nitrogen.",
        image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 4,
        name: "Iced IZU Matchalatte",
        category: "cold",
        price: 6.50,
        desc: "Ceremonial grade Uji Matcha whisked with vanilla bean syrup & oat milk.",
        image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 5,
        name: "Artisanal Butter Croissant",
        category: "pastry",
        price: 4.50,
        desc: "Flaky, 81-layer French butter croissant baked fresh every morning.",
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 6,
        name: "Pistachio Raspberry Tart",
        category: "pastry",
        price: 7.00,
        desc: "Sicilian pistachio frangipane shell filled with fresh raspberries.",
        image: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 7,
        name: "Truffled Avocado Toast",
        category: "brunch",
        price: 14.00,
        desc: "Sourdough toast topped with poached eggs, smashed avocado & white truffle oil.",
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 8,
        name: "Brioche French Toast",
        category: "brunch",
        price: 15.00,
        desc: "Thick-cut brioche soaked in vanilla custard, served with maple syrup & fresh berries.",
        image: "https://images.unsplash.com/photo-1484723091479-00321ed05544?auto=format&fit=crop&q=80&w=400"
    }
];

// 2. Mock Beans Origin Source Data
const BEAN_ORIGINS = {
    ethiopia: {
        title: "Ethiopia Yirgacheffe",
        region: "Gedeo Zone (Altitude: 2,000m)",
        notes: "Bergamot, Floral Jasmine, Sweet Lemon Zest",
        process: "Washed Process",
        roast: "Light-Medium Roast",
        desc: "Sourced from smallholder farmers in southern Ethiopia. Celebrated globally for its elegant floral aroma and vibrant citric acidity."
    },
    colombia: {
        title: "Colombia Huila Micro-Lot",
        region: "San Agustin (Altitude: 1,850m)",
        notes: "Dark Chocolate, Red Apple, Caramel",
        process: "Honey Process",
        roast: "Medium Roast",
        desc: "Grown in rich volcanic soil, delivering a velvety body paired with smooth cocoa undertones and a lingering honey finish."
    },
    guatemala: {
        title: "Guatemala Antigua Estate",
        region: "Antigua Valley (Altitude: 1,600m)",
        notes: "Spiced Cocoa, Roasted Almond, Orange Blossom",
        process: "Fully Washed",
        roast: "Medium-Dark Roast",
        desc: "Surrounded by three volcanoes, this estate yields complex beans with deep chocolate warmth and subtle citrus brilliance."
    }
};

// Global App State
let cart = [];
let selectedCategory = "all";

document.addEventListener("DOMContentLoaded", () => {
    // Render Icons
    lucide.createIcons();

    // Render Components
    renderMenu();
    renderBeanDetails("ethiopia");

    // Event Listeners
    setupEventListeners();
});

// Render Menu Cards
function renderMenu() {
    const grid = document.getElementById("menu-items-grid");
    const filtered = selectedCategory === "all" 
        ? MENU_ITEMS 
        : MENU_ITEMS.filter(item => item.category === selectedCategory);

    grid.innerHTML = filtered.map(item => `
        <div class="menu-card">
            <img src="${item.image}" alt="${item.name}"/>
            <div class="menu-card-info">
                <div>
                    <div class="menu-card-header">
                        <h3 class="menu-card-title">${item.name}</h3>
                        <span class="menu-card-price">$${item.price.toFixed(2)}</span>
                    </div>
                    <p class="menu-card-desc">${item.desc}</p>
                </div>
                <button class="btn btn-sm btn-outline" onclick="addToCart(${item.id})">ADD TO ORDER</button>
            </div>
        </div>
    `).join("");
}

// Render Single Origin Bean Explorer Card
function renderBeanDetails(originKey) {
    const data = BEAN_ORIGINS[originKey];
    const container = document.getElementById("bean-details");

    container.innerHTML = `
        <h3>${data.title}</h3>
        <p style="color: #666; margin-top: 8px;">${data.desc}</p>
        <div class="bean-specs">
            <div class="spec-item">
                <h5>Region & Altitude</h5>
                <p><strong>${data.region}</strong></p>
            </div>
            <div class="spec-item">
                <h5>Tasting Notes</h5>
                <p><strong>${data.notes}</strong></p>
            </div>
            <div class="spec-item">
                <h5>Process & Roast</h5>
                <p><strong>${data.process} &bull; ${data.roast}</strong></p>
            </div>
        </div>
    `;
}

// Event Listeners Initialization
function setupEventListeners() {
    // Menu Category Buttons
    document.querySelectorAll(".category-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            document.querySelectorAll(".category-btn").forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");
            selectedCategory = e.target.getAttribute("data-cat");
            renderMenu();
        });
    });

    // Bean Origin Selector Buttons
    document.querySelectorAll(".bean-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            document.querySelectorAll(".bean-btn").forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");
            renderBeanDetails(e.target.getAttribute("data-bean"));
        });
    });

    // Cart Drawer Toggle Controls
    document.getElementById("cart-btn").addEventListener("click", () => {
        document.getElementById("cart-drawer-overlay").classList.add("active");
    });
    document.getElementById("close-cart-btn").addEventListener("click", () => {
        document.getElementById("cart-drawer-overlay").classList.remove("active");
    });
}

// Cart Logic
function addToCart(productId) {
    const existing = cart.find(i => i.id === productId);
    if(existing) {
        existing.qty += 1;
    } else {
        const item = MENU_ITEMS.find(i => i.id === productId);
        cart.push({ ...item, qty: 1 });
    }
    updateCartUI();
    document.getElementById("cart-drawer-overlay").classList.add("active");
}

function updateCartQty(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if(item) {
        item.qty += delta;
        if(item.qty <= 0) {
            cart = cart.filter(i => i.id !== productId);
        }
    }
    updateCartUI();
}

function updateCartUI() {
    const container = document.getElementById("cart-items-container");
    const badge = document.getElementById("cart-badge");
    const countText = document.getElementById("cart-item-count");

    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    badge.innerText = totalQty;
    countText.innerText = totalQty;

    let subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    let tax = subtotal * 0.08;
    let total = subtotal + tax;

    if (cart.length === 0) {
        container.innerHTML = `<div style="text-align:center; padding: 40px 0; color: #777;">Your order bag is empty.</div>`;
    } else {
        container.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div>
                    <h4 style="font-size:0.95rem;">${item.name}</h4>
                    <span style="color: #C69214; font-weight:600; font-size:0.9rem;">$${(item.price * item.qty).toFixed(2)}</span>
                </div>
                <div style="display:flex; align-items:center; gap:8px;">
                    <button class="btn btn-sm btn-outline" onclick="updateCartQty(${item.id}, -1)">-</button>
                    <span>${item.qty}</span>
                    <button class="btn btn-sm btn-outline" onclick="updateCartQty(${item.id}, 1)">+</button>
                </div>
            </div>
        `).join("");
    }

    document.getElementById("cart-subtotal").innerText = `$${subtotal.toFixed(2)}`;
    document.getElementById("cart-tax").innerText = `$${tax.toFixed(2)}`;
    document.getElementById("cart-total").innerText = `$${total.toFixed(2)}`;
}

function handleCheckout() {
    if(cart.length === 0) {
        alert("Your order bag is empty!");
        return;
    }
    alert("Thank you! Your pickup order has been placed. Estimated preparation time: 15 mins.");
    cart = [];
    updateCartUI();
    document.getElementById("cart-drawer-overlay").classList.remove("active");
}

// Reservation Modal Functions
function openReservationModal() {
    document.getElementById("reservation-modal-overlay").classList.add("active");
}

function closeReservationModal() {
    document.getElementById("reservation-modal-overlay").classList.remove("active");
}

function handleReservationSubmit(e) {
    e.preventDefault();
    alert("Table reservation request received! A confirmation message will be sent to your phone shortly.");
    closeReservationModal();
}