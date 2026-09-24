const url = "https://fakestoreapi.com/products";

let allProducts = [];

fetch(url)
  .then((response) => response.json())
  .then((data) => {

    allProducts = data;

    if (document.getElementById("produk")) {
      tampilkanProduk(data);
    }

    if (document.getElementById("produkTerlaris")) {
      tampilkanProdukTerlaris(data);
    }

    // =========================
    // TRENDING (PURE API DATA)
    // =========================
    tampilkanTrending(data);

  });


// =========================
// FORMAT RUPIAH
// =========================
function formatRupiah(hargaDollar) {

  const rupiah = hargaDollar * 16000;

  return "Rp " + rupiah.toLocaleString("id-ID");

}


// =========================
// TAMPILKAN PRODUK
// =========================
function tampilkanProduk(data) {

  let hasil = "";

  data.forEach((element) => {

    hasil += `
    
    <div class="product bg-white rounded-[28px] overflow-hidden border border-[#eadfd7] hover:shadow-2xl hover:-translate-y-2 transition duration-300">

        <div class="relative bg-[#fff7f2] p-6">

            <a href="/view/detail.html?id=${element.id}" class="block">

                <img 
                  class="w-full h-52 object-contain hover:scale-105 transition duration-300" 
                  src="${element.image}" 
                  alt="${element.title}" 
                />

            </a>
        </div>

        <div class="p-5">

            <p class="text-[11px] text-gray-400 capitalize mb-2">
                ${element.category}
            </p>

            <a href="/view/detail.html?id=${element.id}">

                <h5 class="product-name text-[#3e2d23] text-[16px] font-bold line-clamp-2 h-12 leading-relaxed hover:text-[#b08968] transition">
                    ${element.title}
                </h5>

            </a>

            <div class="flex items-center gap-2 mt-3">

                <div class="flex text-[#ffb703] text-xs">
                    ★★★★★
                </div>

                <span class="text-xs text-gray-400">
                    ${element.rating.rate}
                </span>

            </div>

            <div class="mt-5 flex items-center justify-between">

                <div>

                    <p class="text-[24px] font-extrabold text-[#6b1230]">
                        ${formatRupiah(element.price)}
                    </p>

                    <p class="text-[11px] text-gray-400 line-through">
                        ${formatRupiah(element.price + 20)}
                    </p>

                </div>

                <button
                  onclick="addToCart(${element.id}, \`${element.title}\`, ${element.price}, \`${element.image}\`)"
                  class="px-5 py-3 rounded-full bg-[#6b1230] hover:bg-[#521024] transition duration-300 text-white text-sm font-semibold shadow-lg"
                >
                  Add
                </button>

            </div>

        </div>

    </div>
    `;
  });

  document.getElementById("produk").innerHTML = hasil;
}


// =========================
// PRODUK TERLARIS
// =========================
function tampilProdukTerlaris(data) {

  let hasil = "";

  const produkTop = data
    .sort((a, b) => b.rating.rate - a.rating.rate)
    .slice(0, 5);

  produkTop.forEach((element) => {

    hasil += `
    
    <div class="group bg-white rounded-[28px] overflow-hidden border border-[#eadfd7] hover:shadow-2xl hover:-translate-y-2 transition duration-300">

        <div class="relative bg-[#fff7f2] p-5">

            <a href="/view/detail.html?id=${element.id}">

                <img
                  src="${element.image}"
                  class="w-full h-40 object-contain group-hover:scale-105 transition duration-300"
                >

            </a>

        </div>

        <div class="p-5">

            <p class="text-[11px] text-gray-400 capitalize mb-2">
                ${element.category}
            </p>

            <h3 class="font-bold text-[#3e2d23] text-[15px] line-clamp-2 h-12 leading-relaxed">
                ${element.title}
            </h3>

            <div class="flex items-center gap-2 mt-3">

                <div class="flex text-[#ffb703] text-xs">
                    ★★★★★
                </div>

                <span class="text-xs text-gray-400">
                    ${element.rating.rate}
                </span>

            </div>

            <div class="flex items-center justify-between mt-5">

                <div>

                    <p class="text-[#6b1230] font-extrabold text-[22px]">
                        ${formatRupiah(element.price)}
                    </p>

                </div>

                <button
                  onclick="addToCart(${element.id}, \`${element.title}\`, ${element.price}, \`${element.image}\`)"
                  class="px-4 py-2 rounded-full bg-[#6b1230] hover:bg-[#521024] transition duration-300 text-white text-sm font-semibold shadow-md"
                >
                  Add
                </button>

            </div>

        </div>

    </div>
    `;
  });

  const container = document.getElementById("produkTerlaris");

  if (container) {
    container.innerHTML = hasil;
  }
}


// =========================
// TRENDING PRODUK (PURE API)
// =========================
function tampilkanTrending(data) {

  const container = document.getElementById("trending");

  if (!container) return;

  //  PURE API DATA (NO SORT / NO RANDOM)
  const trending = data.slice(0, 4);

  let hasil = "";

  trending.forEach((element) => {

    hasil += `
      <div class="bg-white rounded-[28px] overflow-hidden border border-[#eadfd7] hover:shadow-2xl hover:-translate-y-2 transition duration-300">

        <div class="bg-[#fff7f2] p-5">
          <img src="${element.image}" class="w-full h-40 object-contain">
        </div>

        <div class="p-5">

          <p class="text-[11px] text-gray-400 capitalize mb-2">
            ${element.category}
          </p>

          <h3 class="font-bold text-[#3e2d23] text-[15px] line-clamp-2 h-12">
            ${element.title}
          </h3>

          <p class="text-[#6b1230] font-extrabold mt-3">
            ${formatRupiah(element.price)}
          </p>

        </div>

      </div>
    `;
  });

  container.innerHTML = hasil;
}


// =========================
// ADD TO CART
// =========================
function addToCart(id, title, price, image) {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let productExist = cart.find(item => item.id === id);

  if (productExist) {
    productExist.qty += 1;
  } else {
    cart.push({
      id,
      title,
      price,
      image,
      qty: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartBadge();
}


// =========================
// UPDATE BADGE
// =========================
function updateCartBadge() {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let totalQty = 0;

  cart.forEach(item => {
    totalQty += item.qty;
  });

  const badge = document.querySelector(".absolute.-top-1");

  if (badge) {
    badge.innerText = totalQty;
  }
}

updateCartBadge();


// =========================
// SEARCH
// =========================
const searchInput = document.getElementById("searchInput");

if (searchInput) {

  searchInput.addEventListener("input", function () {

    const keyword = searchInput.value.toLowerCase();

    const products = document.querySelectorAll(".product");

    products.forEach((product) => {

      const title = product
        .querySelector(".product-name")
        .textContent
        .toLowerCase();

      if (title.includes(keyword)) {
        product.style.display = "";
      } else {
        product.style.display = "none";
      }

    });

  });

}


// =========================
// FILTER KATEGORI
// =========================
const kategoriItem = document.querySelectorAll(".category-btn");

if (kategoriItem) {

  kategoriItem.forEach((item) => {

    item.addEventListener("click", () => {

      kategoriItem.forEach((btn) => {
        btn.classList.remove("bg-[#6b1230]", "text-white");
        btn.classList.add("bg-white");
      });

      item.classList.remove("bg-white");
      item.classList.add("bg-[#6b1230]", "text-white");

      const category = item.dataset.category;

      if (category === "all") {
        tampilkanProduk(allProducts);
      } else {
        const filterProduk = allProducts.filter((produk) => {
          return produk.category === category;
        });

        tampilkanProduk(filterProduk);
      }

    });

  });

}


// =========================
// CART PAGE
// =========================
function renderCart() {

  if (!document.getElementById("cartItems")) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let hasil = "";

  cart.forEach((item, index) => {

    hasil += `
    
    <div class="flex items-start gap-4 pb-6 border-b border-[#ececec]">

        <!-- CHECKBOX -->
        <input
          type="checkbox"
          class="w-5 h-5 mt-9 accent-[#6b1230] item-checkbox"
          data-index="${index}"
          checked
          onchange="updateSelectedTotal()"
        >

        <div class="w-24 h-24 bg-white rounded-[18px] p-3 shadow-sm flex items-center justify-center shrink-0">

            <img 
              src="${item.image}"
              class="w-full h-full object-contain"
            >

        </div>

        <div class="flex-1">

            <h2 class="text-[17px] font-extrabold text-[#5b4636] leading-tight line-clamp-2">
                ${item.title}
            </h2>

           <p class="text-[22px] font-extrabold text-[#6b1230] mt-1">
    ${formatRupiah(item.price)}
</p>

<p class="text-sm text-gray-500 mt-1">
    ${item.qty} × ${formatRupiah(item.price)}
</p>

<p class="text-[15px] font-bold text-[#5b4636]">
    Subtotal: ${formatRupiah(item.price * item.qty)}
</p>

            <div class="flex items-center justify-between mt-5">

                <div class="flex items-center gap-3">

                    <button onclick="kurangQty(${index}); renderCart(); updateSelectedTotal()"
                      class="w-9 h-9 rounded-full bg-[#f2f2f2] hover:bg-[#e8e8e8] transition">
                      −
                    </button>

                    <span class="text-[20px] font-extrabold text-[#5b4636]">
                      ${item.qty}
                    </span>

                    <button onclick="tambahQty(${index}); renderCart(); updateSelectedTotal()"
                      class="w-9 h-9 rounded-full bg-[#f2f2f2] hover:bg-[#e8e8e8] transition">
                      +
                    </button>

                </div>

                <button onclick="hapusItem(${index}); renderCart(); updateSelectedTotal()"
                  class="text-red-400 hover:text-red-600 text-xl">
                  🗑
                </button>

            </div>

        </div>

    </div>
    `;
  });

  document.getElementById("cartItems").innerHTML = hasil;

  updateSelectedTotal();
}

function updateSelectedTotal() {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let total = 0;
  let qty = 0;

  document.querySelectorAll(".item-checkbox").forEach((checkbox) => {

    if (checkbox.checked) {

      let item = cart[checkbox.dataset.index];

      total += item.price * item.qty;
      qty += item.qty;
    }
  });

  document.getElementById("total").innerText =
    formatRupiah(total);

  const totalItem = document.getElementById("totalItem");
  if (totalItem) {
    totalItem.innerText = qty + " Items";
  }

  updateCheckout(total);
}


// =========================
// QTY
// =========================
function tambahQty(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].qty += 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function kurangQty(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart[index].qty > 1) {
    cart[index].qty -= 1;
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function hapusItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function clearCart() {
  localStorage.removeItem("cart");
  renderCart();
}


// =========================
// CHECKOUT
// =========================
function updateCheckout(total) {

  const subtotal = document.getElementById("checkoutSubtotal");
  const checkoutTotal = document.getElementById("checkoutTotal");

  if (subtotal) subtotal.innerText = formatRupiah(total);
  if (checkoutTotal) checkoutTotal.innerText = formatRupiah(total);
}

renderCart();
function checkout() {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("Keranjang masih kosong 🛒");
    return;
  }

  alert("Checkout berhasil 🎉");

  localStorage.removeItem("cart");

  window.location.href = "/view/produk.html";
}



  // =========================
  // LOGOUT
  // =========================
  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

      localStorage.removeItem("isLogin");
      localStorage.removeItem("userLogin");

      alert("Logout berhasil 👋");

      window.location.href = "/view/login.html";

    });

  }

  // =========================
// PROFILE DROPDOWN
// =========================
const profileBtn = document.getElementById("profileBtn");
const profileMenu = document.getElementById("profileMenu");

if (profileBtn && profileMenu) {

  // buka/tutup dropdown
  profileBtn.addEventListener("click", (e) => {

    e.stopPropagation();

    profileMenu.classList.toggle("hidden");

  });

  // klik luar = tutup
  document.addEventListener("click", (e) => {

    if (
      !profileBtn.contains(e.target) &&
      !profileMenu.contains(e.target)
    ) {
      profileMenu.classList.add("hidden");
    }

  });

}