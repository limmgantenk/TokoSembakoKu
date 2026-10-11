// Sample Product Database
const products = [
    { id: 1, name: "Indomie Goreng Original 85g", category: "jajanan", price: 3100, image: "https://th.bing.com/th/id/OIP.RHb9WwNY_VJHNHuyy_64xwHaHa?w=172&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
    { id: 2, name: "Chitato Sapi Panggang 68g", category: "jajanan", price: 11500, image: "https://th.bing.com/th/id/OIP.TISJtiPb9SnFY1QfKp510wHaHa?w=186&h=186&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
    { id: 3, name: "Teh Pucuk Harum 350ml", category: "minuman", price: 3500, image: "https://th.bing.com/th/id/OIP.yQg88dDAzInxVxBnUd7HogHaHa?w=179&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
    { id: 4, name: "Aqua Air Mineral 600ml", category: "minuman", price: 3000, image: "https://th.bing.com/th/id/OIP.mDxVJQFTm4VgD-5loXz2uwHaHa?w=199&h=199&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
    { id: 5, name: "Minyak Goreng Bimoli 1L", category: "kebutuhan", price: 18500, image: "https://th.bing.com/th/id/OIP.oag8Q6euwTl-lsuY94PfPwHaHa?w=179&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
    { id: 6, name: "Beras Premium Pulen 5kg", category: "kebutuhan", price: 68000, image: "https://th.bing.com/th/id/OIP.N3amVpBAPy_L2Zk8IWmGXgHaE8?w=236&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
    { id: 7, name: "Sampo Lifebuoy 170ml", category: "kebutuhan", price: 21000, image: "https://th.bing.com/th/id/OIP.aUN5COUYvQpSJrW2FD8yCAHaGM?w=239&h=200&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
    { id: 8, name: "Rokok Sampoerna A Mild 16", category: "rokok", price: 32500, image: "https://th.bing.com/th/id/OIP.Tpis8m1EohG21q0PdjrizgHaHa?w=176&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
    { id: 9, name: "Rokok Gudang Garam Filter 12", category: "rokok", price: 24000, image: "https://th.bing.com/th/id/OIP.OngBGc0yKiIXj2yir-akpwHaHa?w=179&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
    { id: 10, name: "Gula Pasir Gulaku 1kg", category: "kebutuhan", price: 17500, image: "https://th.bing.com/th/id/OIP.AKiqz9p9IEFJOqF4Ej3dkwHaHv?w=160&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
];

let cart = [];
let currentCategory = 'all';

// Format Currency Helper
function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number);
}

// Render Products
function renderProducts() {
    const grid = document.getElementById('product-grid');
    const searchKeyword = document.getElementById('search-input').value.toLowerCase();
    grid.innerHTML = '';

    const filtered = products.filter(p => {
        const matchCategory = currentCategory === 'all' || p.category === currentCategory;
        const matchSearch = p.name.toLowerCase().includes(searchKeyword);
        return matchCategory && matchSearch;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `<div class="col-span-full text-center py-12 text-gray-400">Produk tidak ditemukan</div>`;
        return;
    }

    filtered.forEach(product => {
        const card = document.createElement('div');
        card.className = "bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition border border-gray-100 flex flex-col justify-between";
        card.innerHTML = `
            <div>
                <img src="${product.image}" alt="${product.name}" class="w-full h-36 sm:h-44 object-cover">
                <div class="p-4">
                    <span class="text-[10px] font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-md uppercase tracking-wider">${product.category}</span>
                    <h3 class="font-bold text-sm text-gray-800 mt-1 line-clamp-2">${product.name}</h3>
                    <p class="text-brand-600 font-extrabold text-base mt-2">${formatRupiah(product.price)}</p>
                </div>
            </div>
            <div class="px-4 pb-4">
                <button onclick="addToCart(${product.id})" class="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-2 rounded-xl text-xs transition flex items-center justify-center gap-1.5">
                    <i class="fa-solid fa-plus text-[10px]"></i> Tambah Keranjang
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Filter Category
function setCategory(cat) {
    currentCategory = cat;
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.className = "cat-btn bg-white hover:bg-brand-50 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap border border-gray-200 transition";
    });
    event.target.className = "cat-btn active bg-brand-600 text-white px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition shadow-sm";
    renderProducts();
}

function filterProducts() {
    renderProducts();
}

// Cart Actions
function addToCart(productId) {
    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.qty++;
    } else {
        const prod = products.find(p => p.id === productId);
        cart.push({ ...prod, qty: 1 });
    }
    updateCartUI();
}

function updateCartQty(productId, change) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.qty += change;
        if (item.qty <= 0) {
            cart = cart.filter(i => i.id !== productId);
        }
    }
    updateCartUI();
}

function updateCartUI() {
    const badge = document.getElementById('cart-badge');
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    badge.innerText = totalItems;

    const container = document.getElementById('cart-items-container');
    container.innerHTML = '';

    let subtotal = 0;

    if (cart.length === 0) {
        container.innerHTML = `<div class="text-center py-12 text-gray-400 text-sm">Keranjang Anda masih kosong</div>`;
    } else {
        cart.forEach(item => {
            subtotal += item.price * item.qty;
            const itemEl = document.createElement('div');
            itemEl.className = "flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100";
            itemEl.innerHTML = `
                <img src="${item.image}" class="w-12 h-12 rounded-lg object-cover">
                <div class="flex-grow">
                    <h4 class="text-xs font-bold text-gray-800 line-clamp-1">${item.name}</h4>
                    <div class="text-xs text-brand-600 font-bold mt-0.5">${formatRupiah(item.price)}</div>
                </div>
                <div class="flex items-center gap-2 bg-white px-2 py-1 rounded-lg border border-gray-200 text-xs">
                    <button onclick="updateCartQty(${item.id}, -1)" class="text-gray-500 hover:text-brand-600 font-bold px-1">-</button>
                    <span class="font-bold text-gray-800">${item.qty}</span>
                    <button onclick="updateCartQty(${item.id}, 1)" class="text-gray-500 hover:text-brand-600 font-bold px-1">+</button>
                </div>
            `;
            container.appendChild(itemEl);
        });
    }

    document.getElementById('modal-subtotal').innerText = formatRupiah(subtotal);
}

function toggleCartModal() {
    const modal = document.getElementById('cart-modal');
    modal.classList.toggle('hidden');
}

// Navigation
function showPage(page) {
    document.getElementById('page-home').classList.add('hidden');
    document.getElementById('page-checkout').classList.add('hidden');

    if (page === 'home') {
        document.getElementById('page-home').classList.remove('hidden');
    } else if (page === 'checkout') {
        document.getElementById('page-checkout').classList.remove('hidden');
        renderCheckoutSummary();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goToCheckout() {
    if (cart.length === 0) {
        alert('Keranjang belanja Anda masih kosong!');
        return;
    }
    toggleCartModal();
    showPage('checkout');
}

// Checkout Page Helpers
function renderCheckoutSummary() {
    const itemsContainer = document.getElementById('checkout-items');
    itemsContainer.innerHTML = '';
    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.qty;
        const el = document.createElement('div');
        el.className = "flex justify-between text-xs text-gray-700";
        el.innerHTML = `
            <span>${item.name} <strong class="text-gray-900">x${item.qty}</strong></span>
            <span class="font-semibold">${formatRupiah(item.price * item.qty)}</span>
        `;
        itemsContainer.appendChild(el);
    });

    const deliveryType = document.querySelector('input[name="delivery"]:checked').value;
    const shippingCost = deliveryType === 'delivery' ? 2000 : 0;

    document.getElementById('checkout-item-count').innerText = `${cart.length} Jenis Barang`;
    document.getElementById('checkout-subtotal').innerText = formatRupiah(subtotal);
    document.getElementById('checkout-shipping').innerText = shippingCost > 0 ? formatRupiah(shippingCost) : 'Gratis (Ambil di Toko)';
    document.getElementById('checkout-total').innerText = formatRupiah(subtotal + shippingCost);
}

function toggleAddressField(show) {
    const addr = document.getElementById('address-container');
    if (show) {
        addr.classList.remove('hidden');
    } else {
        addr.classList.add('hidden');
    }
    renderCheckoutSummary();
}

function togglePaymentDetail(type) {
    if (type === 'qris') {
        document.getElementById('qris-info').classList.remove('hidden');
        document.getElementById('cod-info').classList.add('hidden');
    } else {
        document.getElementById('qris-info').classList.add('hidden');
        document.getElementById('cod-info').classList.remove('hidden');
    }
}

// WhatsApp Checkout Submission
function submitOrder(e) {
    e.preventDefault();

    const name = document.getElementById('cust-name').value;
    const wa = document.getElementById('cust-wa').value;
    const email = document.getElementById('cust-email').value || '-';
    const deliveryType = document.querySelector('input[name="delivery"]:checked').value;
    const address = deliveryType === 'delivery' ? document.getElementById('cust-address').value : 'Ambil Mandiri di Toko';
    const paymentType = document.querySelector('input[name="payment"]:checked').value.toUpperCase();

    let subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    let shippingCost = deliveryType === 'delivery' ? 5000 : 0;
    let total = subtotal + shippingCost;

    let message = `*PESANAN BARU - TOKO SEMBAKO BERKAH*\n`;
    message += `-------------------------------------------\n`;
    message += `*Nama:* ${name}\n`;
    message += `*No. WhatsApp:* ${wa}\n`;
    message += `*Email:* ${email}\n`;
    message += `*Pengiriman:* ${deliveryType === 'delivery' ? 'Diantar ke Rumah' : 'Ambil di Toko'}\n`;
    if (deliveryType === 'delivery') {
        message += `*Alamat:* ${address}\n`;
    }
    message += `*Pembayaran:* ${paymentType}\n`;
    message += `-------------------------------------------\n`;
    message += `*DAFTAR PESANAN:*\n`;

    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name} (${item.qty}x) = ${formatRupiah(item.price * item.qty)}\n`;
    });

    message += `-------------------------------------------\n`;
    message += `*Subtotal:* ${formatRupiah(subtotal)}\n`;
    message += `*Ongkir:* ${formatRupiah(shippingCost)}\n`;
    message += `*TOTAL BAYAR:* ${formatRupiah(total)}\n\n`;
    message += `Mohon konfirmasi pesanan ini. Terima kasih!`;

    const storeWA = "62882006316680"; // Ganti dengan nomor WhatsApp toko kamu
    const encodedUrl = `https://wa.me/${62882006316680}?text=${encodeURIComponent(message)}`;

    window.open(encodedUrl, '_blank');
}

// Initialize App
renderProducts();
updateCartUI();