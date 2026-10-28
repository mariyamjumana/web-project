// Mock Products Catalog with vibrant aesthetics
const products = [
    { id: 1, name: 'Neon Cyberpunk Hoodie', price: 79.99, category: 'Apparel', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80' },
    { id: 2, name: 'RGB Mechanical Keyboard', price: 129.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80' },
    { id: 3, name: 'Sunset Gradient Sneaker', price: 95.50, category: 'Footwear', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80' },
    { id: 4, name: 'Aesthetic Desk Lamp', price: 45.00, category: 'Home', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80' },
    { id: 5, name: 'Wireless Bass Earbuds', price: 59.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80' },
    { id: 6, name: 'Minimalist Ceramic Mug', price: 22.00, category: 'Home', image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=600&q=80' }
];

let cart = [];

// Render Product Catalog to the DOM
function renderProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    grid.innerHTML = products.map(product => `
        <div class="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition flex flex-col justify-between border border-slate-100">
            <div class="relative h-56 overflow-hidden bg-slate-100">
                <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover hover:scale-105 transition duration-300">
                <span class="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-bold px-3 py-1 rounded-full shadow">
                    ${product.category}
                </span>
            </div>
            <div class="p-5 flex flex-col flex-grow justify-between">
                <div>
                    <h4 class="font-bold text-lg text-slate-800 mb-1">${product.name}</h4>
                    <p class="text-fuchsia-600 font-extrabold text-xl mb-4">$${product.price.toFixed(2)}</p>
                </div>
                <button onclick="addToCart(${product.id})" class="w-full bg-slate-900 hover:bg-gradient-to-r hover:from-violet-600 hover:to-fuchsia-600 text-white font-medium py-2.5 rounded-xl transition shadow">
                    <i class="fa-solid fa-cart-plus mr-2"></i> Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Add item to cart or increment quantity
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartUI();
    toggleCart(true);
}

// Update specific item quantity in cart
function updateQuantity(productId, change) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== productId);
        }
    }
    updateCartUI();
}

// Refresh Cart UI Badges, Items list, and Total price
function updateCartUI() {
    const badge = document.getElementById('cart-badge');
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');

    if (!badge || !container || !totalEl) return;

    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    badge.innerText = totalCount;
    totalEl.innerText = `$${totalPrice.toFixed(2)}`;

    if (cart.length === 0) {
        container.innerHTML = `<p class="text-center text-slate-400 py-12">Your cart is empty. Start shopping! ✨</p>`;
        return;
    }

    container.innerHTML = cart.map(item => `
        <div class="flex items-center justify-between py-3">
            <div class="flex items-center gap-3">
                <img src="${item.image}" alt="${item.name}" class="w-14 h-14 object-cover rounded-lg shadow-sm">
                <div>
                    <h5 class="font-bold text-sm text-slate-800">${item.name}</h5>
                    <p class="text-xs text-slate-500">$${item.price.toFixed(2)} x ${item.quantity}</p>
                </div>
            </div>
            <div class="flex items-center gap-2">
                <button onclick="updateQuantity(${item.id}, -1)" class="w-7 h-7 bg-slate-100 rounded-full font-bold text-slate-600 hover:bg-slate-200 transition flex items-center justify-center">-</button>
                <span class="text-sm font-bold w-4 text-center">${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, 1)" class="w-7 h-7 bg-slate-100 rounded-full font-bold text-slate-600 hover:bg-slate-200 transition flex items-center justify-center">+</button>
            </div>
        </div>
    `).join('');
}

// Toggle Cart Sidebar Drawer visibility
function toggleCart(forceOpen = false) {
    const drawer = document.getElementById('cart-drawer');
    if (!drawer) return;
    
    if (forceOpen) {
        drawer.classList.remove('hidden');
    } else {
        drawer.classList.toggle('hidden');
    }
}

// Checkout action handler
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const customerName = prompt('Enter your name for shipping:', 'Customer');
    if (!customerName) return;

    alert(`🎉 Order placed successfully, ${customerName}!\nThank you for shopping with VibrantCart.`);
    cart = [];
    updateCartUI();
    toggleCart();
}

// Initialize application on page load
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartUI();
});
