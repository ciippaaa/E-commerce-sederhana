const params = new URLSearchParams(window.location.search);

const id = params.get("id");

// =========================
// FETCH DETAIL PRODUCT
// =========================
fetch(`https://fakestoreapi.com/products/${id}`)
  .then((response) => response.json())

  .then((data) => {

    // KONVERSI KE RUPIAH
    const harga = Math.round(data.price * 16000);

    const hargaRupiah = harga.toLocaleString("id-ID");

    const hasil = `
      <div class="max-w-6xl mx-auto">

        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white border border-[#e7d8c9] shadow-lg rounded-[35px] overflow-hidden">

          <!-- IMAGE -->
          <div class="bg-[#f8f5f2] flex items-center justify-center p-10">

            <img 
              src="${data.image}" 
              alt="${data.title}"
              class="h-96 object-contain hover:scale-105 transition duration-300"
            >

          </div>

          <!-- CONTENT -->
          <div class="p-10 flex flex-col justify-center">

            <!-- CATEGORY -->
            <p class="text-[#b08968] font-semibold capitalize mb-3 tracking-wide">

              ${data.category}

            </p>

            <!-- TITLE -->
            <h1 class="text-4xl font-bold text-gray-800 leading-snug mb-5">

              ${data.title}

            </h1>

            <!-- RATING -->
            <div class="flex items-center gap-2 mb-6">

              <span class="text-yellow-500 text-xl">
                ⭐
              </span>

              <p class="text-gray-600 font-medium">

                ${data.rating.rate} Rating

              </p>

            </div>

            <!-- PRICE -->
            <p class="text-5xl font-bold text-[#b08968] mb-8">

              Rp ${hargaRupiah}

            </p>

            <!-- DESCRIPTION -->
            <p class="text-gray-600 leading-relaxed mb-10">

              ${data.description}

            </p>

            <!-- BUTTON -->
            <button
              onclick="addToCart(
                ${data.id},
                '${data.title.replace(/'/g, "\\'")}',
                ${harga},
                '${data.image}'
              )"
              class="w-full md:w-fit px-8 py-4 rounded-2xl bg-[#c8a27a] hover:bg-[#b08968] text-white transition duration-300 font-semibold shadow-md text-lg"
            >

              Add To Cart

            </button>

          </div>

        </div>

      </div>
    `;

    document.getElementById("detail").innerHTML = hasil;

  })

  .catch((error) => {

    console.error(error);

    document.getElementById("detail").innerHTML = `
      <div class="text-center text-red-500 text-xl">

        Failed to load product.

      </div>
    `;

  });


// =========================
// ADD TO CART
// =========================
function addToCart(id, title, price, image) {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const produk = {
    id,
    title,
    price,
    image,
    qty: 1
  };

  const existing = cart.find((item) => item.id === id);

  if (existing) {

    existing.qty += 1;

  } else {

    cart.push(produk);

  }

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Produk berhasil ditambahkan ke cart 🛒");

}