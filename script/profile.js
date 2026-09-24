// =========================
// AMBIL DATA USER
// =========================
const userLogin = JSON.parse(localStorage.getItem("userLogin"));

const username = document.getElementById("username");
const email = document.getElementById("email");

if (userLogin) {

  username.textContent = userLogin.username || "User";
  email.textContent = userLogin.email || "email@gmail.com";

}

// =========================
// LOGOUT
// =========================
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () => {

  localStorage.removeItem("isLogin");
  localStorage.removeItem("userLogin");

  alert("Logout berhasil 👋");

  window.location.href = "/view/login.html";

});