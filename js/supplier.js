// ===============================
// SPMDR - Supplier
// ===============================

// Papar apabila halaman dibuka
document.addEventListener("DOMContentLoaded", () => {
    loadSupplier();
});

// Simpan Supplier
async function simpanSupplier() {

    const nama = document.getElementById("nama").value;
    const telefon = document.getElementById("telefon").value;
    const email = document.getElementById("email").value;
    const alamat = document.getElementById("alamat").value;

    if (!nama || !telefon) {
        alert("Sila isi Nama Supplier dan No Telefon.");
        return;
    }

    // Nanti akan disimpan ke Supabase
    console.log({
        nama,
        telefon,
        email,
        alamat
    });

    alert("Supplier berjaya disimpan.");

    document.getElementById("nama").value = "";
    document.getElementById("telefon").value = "";
    document.getElementById("email").value = "";
    document.getElementById("alamat").value = "";

    loadSupplier();
}

// Papar Senarai Supplier
function loadSupplier() {

    const tbody = document.getElementById("senaraiSupplier");

    tbody.innerHTML = `
        <tr>
            <td colspan="5" class="text-center text-muted">
                Tiada data supplier.
            </td>
        </tr>
    `;
}

// Logout
function logout() {
    window.location.href = "index.html";
}
