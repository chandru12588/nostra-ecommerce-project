const products = [
  { id: 1, name: "iPhone 14", price: 79999, category: "mobiles", image: "https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/261935_0_fn4zjh.png" },
  { id: 2, name: "Samsung Galaxy S23", price: 69999, category: "mobiles", image: "https://www.logicainfoway.com/wp-content/uploads/2024/01/100-2.jpg" },
  { id: 3, name: "Dell Inspiron Laptop", price: 58999, category: "laptops", image: "https://m.media-amazon.com/images/I/712WiT-wexL._AC_UY218_.jpg" },
  { id: 4, name: "MacBook Air M2", price: 99999, category: "laptops", image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/macbook-air-og-202503?wid=1200&hei=630&fmt=jpeg&qlt=90&.v=1739216814915" },
  { id: 5, name: "Men’s Jacket", price: 1999, category: "men", image: "https://devotedstore.com/cdn/shop/files/1000074562.jpg?v=1741216631" },
  { id: 6, name: "Men’s Sneakers", price: 2499, category: "men", image: "https://images.bewakoof.com/original/men-s-red-black-color-block-high-top-sneakers-630682-1721643544-1.jpg" },
  { id: 7, name: "Women’s Kurti", price: 1499, category: "women", image: "https://mahezon.in/cdn/shop/files/PureCottonWomen_sKurtiPantset_1200x1200.png?v=1715701539" },
  { id: 8, name: "Women’s Handbag", price: 2999, category: "women", image: "https://images-cdn.ubuy.co.in/654caca8d7fcae0ea7465f07-handbags-for-women-fashion-ladies-purses.jpg" },
];

let cart = [];

function displayProducts(items) {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = "";
  items.forEach(p => {
    grid.innerHTML += `
      <div class="bg-white p-3 rounded-lg shadow-lg flex flex-col hover:shadow-xl transition">
        <img src="${p.image}" alt="${p.name}" class="w-full h-36 sm:h-48 object-cover rounded-lg">
        <h3 class="font-semibold mt-2 text-sm sm:text-base">${p.name}</h3>
        <p class="text-green-600 font-semibold text-sm sm:text-base">₹${p.price}</p>
        <button onclick="addToCart(${p.id})"
          class="bg-indigo-600 text-white py-1 sm:py-2 mt-2 rounded-lg text-sm sm:text-base hover:bg-indigo-700 transition">
          Add to Cart
        </button>
      </div>`;
  });
}

function filterCategory(cat) {
  displayProducts(cat === "all" ? products : products.filter(p => p.category === cat));
}

function searchProducts() {
  const query = document.getElementById("searchBox").value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(query));
  displayProducts(filtered);
}

function addToCart(id) {
  const item = products.find(p => p.id === id);
  cart.push(item);
  alert(`${item.name} added to cart`);
  saveCart();
}

function openCart() {
  document.getElementById("cartModal").classList.remove("hidden");
  renderCart();
}

function closeCart() {
  document.getElementById("cartModal").classList.add("hidden");
}

function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const total = cart.reduce((sum, i) => sum + i.price, 0);
  cartItems.innerHTML = cart.map(i => `<p class="text-sm sm:text-base">${i.name} - ₹${i.price}</p>`).join("");
  document.getElementById("cartTotal").textContent = "₹" + total;
}

function checkout() {
  alert("✅ Checkout successful! Thank you for shopping with Nostra!");
  cart = [];
  saveCart();
  closeCart();
}

function saveCart() {
  localStorage.setItem("nostraCart", JSON.stringify(cart));
}

function loadCart() {
  const saved = JSON.parse(localStorage.getItem("nostraCart"));
  if (saved) cart = saved;
}

window.onload = () => {
  loadCart();
  displayProducts(products);
};


  
