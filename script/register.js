function register() {

    // ambil input
    const username = document
        .getElementById("username")
        .value
        .trim()

    const email = document
        .getElementById("email")
        .value
        .trim()

    const password = document
        .getElementById("password")
        .value
        .trim()

    // validasi
    if(username === "" || email === "" || password === "") {

        alert("Semua input wajib diisi ❌")

        return

    }

    // ambil data lama
    let users = JSON.parse(
        localStorage.getItem("users")
    ) || []

    // cek email sudah ada
    const cekUser = users.find((item) => {

        return item.email === email

    })

    if(cekUser) {

        alert("Email sudah digunakan ❌")

        return

    }

    // tambah user baru
    users.push({

        username: username,
        email: email,
        password: password

    })

    // simpan ke localStorage
    localStorage.setItem(
        "users",
        JSON.stringify(users)
    )

    alert("Register berhasil ")

    // pindah ke login
    setTimeout(() => {

        window.location.href = "/view/index.html"

    }, 1000)

}