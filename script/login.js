let users = [];


// =========================
// AMBIL DATA USER
// =========================
async function getUsers() {

  try {

    const response = await fetch("/user.json");

    users = await response.json();

    console.log(users);

  } catch (error) {

    console.log("Error:", error);

  }

}


// =========================
// FUNCTION LOGIN
// =========================
async function login() {

  await getUsers();

  const email =
    document
      .getElementById("email")
      .value
      .trim();

  const password =
    document
      .getElementById("password")
      .value
      .trim();

  const user = users.find((item) => {
    return (
      item.email === email &&
      item.password === password
    );
  });

  if (user) {

    alert("Login Berhasil ");

    localStorage.setItem(
      "userLogin",
      JSON.stringify(user)
    );

    localStorage.setItem(
      "isLogin",
      "true"
    );

    // langsung update UI sebelum pindah (biar aman)
    updateUI();

    window.location.href =
      "/view/produk.html";

  } else {

    alert("Email atau Password salah ❌");

  }

}


// =========================
// UPDATE UI (LOGIN / REGISTER HIDE)
// =========================
function updateUI() {

  const isLogin =
    localStorage.getItem("isLogin");

  const loginBtn =
    document.querySelector(
      'a[href="login.html"]'
    );

  const registerBtn =
    document.querySelector(
      'a[href="register.html"]'
    );

  const profileMenu =
    document.getElementById("profileMenu");

  if (isLogin === "true") {

    if (loginBtn)
      loginBtn.style.display = "none";

    if (registerBtn)
      registerBtn.style.display = "none";

    if (profileMenu)
      profileMenu.style.display = "block";

  } else {

    if (loginBtn)
      loginBtn.style.display = "block";

    if (registerBtn)
      registerBtn.style.display = "block";

    if (profileMenu)
      profileMenu.style.display = "none";

  }
}


// =========================
// CEK STATUS LOGIN SAAT LOAD
// =========================
window.addEventListener(
  "DOMContentLoaded",
  () => {
    updateUI();
  }
);