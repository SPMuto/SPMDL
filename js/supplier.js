// =============================
// SPMDR - Supplier
// =============================

let editId = null;

// Apabila halaman dibuka
document.addEventListener("DOMContentLoaded", () => {
    loadSupplier();
});

// =============================
// Simpan / Kemas Kini Supplier
// =============================
async function simpanSupplier() {

    const supplier = {
        kod_supplier: document.getElementById("kod_supplier").value.trim(),
        nama_supplier: document.getElementById("nama_supplier").value.trim(),
        nama_syarikat: document.getElementById("nama_syarikat").value.trim(),
        no_telefon: document.getElementById("no_telefon").value.trim(),
        email: document.getElementById("email").value.trim(),
        alamat: document.getElementById("alamat").value.trim()
    };

    if (supplier.nama_supplier === "") {
        alert("Nama Supplier wajib diisi.");
        return;
    }

    let error;

    if (editId === null) {

        ({ error } = await supabaseClient
            .from("supplier")
            .insert([supplier]));

    } else {

        ({ error } = await supabaseClient
            .from("supplier")
            .update(supplier)
            .eq("id", editId));

    }

    if (error) {
        alert(error.message);
        return;
    }

    alert(editId === null ? "Supplier berjaya disimpan." : "Supplier berjaya dikemaskini.");

    document.getElementById("supplierForm").reset();

    editId = null;

    loadSupplier();
}

// =============================
// Papar Supplier
// =============================
async function loadSupplier() {

    const { data, error } = await supabaseClient
        .from("supplier")
        .select("*")
        .order("id", { ascending: false });

    if (error) {
        console.error(error);
        return;
    }

    const tbody = document.getElementById("senaraiSupplier");

    tbody.innerHTML = "";

    if (data.length === 0) {

        tbody.innerHTML = `
        <tr>
            <td colspan="6" class="text-center">
                Tiada rekod supplier.
            </td>
        </tr>`;
        return;
    }

    data.forEach(item => {

        tbody.innerHTML += `
        <tr>

            <td>${item.kod_supplier ?? ""}</td>

            <td>${item.nama_supplier}</td>

            <td>${item.nama_syarikat ?? ""}</td>

            <td>${item.no_telefon ?? ""}</td>

            <td>${item.email ?? ""}</td>

            <td>

                <button
                    class="btn btn-warning btn-sm"
                    onclick="editSupplier(${item.id})">

                    <i class="bi bi-pencil"></i>

                </button>

                <button
                    class="btn btn-danger btn-sm"
                    onclick="deleteSupplier(${item.id})">

                    <i class="bi bi-trash"></i>

                </button>

            </td>

        </tr>
        `;
    });

}

// =============================
// Edit Supplier
// =============================
async function editSupplier(id) {

    const { data, error } = await supabaseClient
        .from("supplier")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        alert(error.message);
        return;
    }

    editId = id;

    document.getElementById("kod_supplier").value = data.kod_supplier ?? "";
    document.getElementById("nama_supplier").value = data.nama_supplier ?? "";
    document.getElementById("nama_syarikat").value = data.nama_syarikat ?? "";
    document.getElementById("no_telefon").value = data.no_telefon ?? "";
    document.getElementById("email").value = data.email ?? "";
    document.getElementById("alamat").value = data.alamat ?? "";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

// =============================
// Padam Supplier
// =============================
async function deleteSupplier(id) {

    if (!confirm("Padam supplier ini?")) return;

    const { error } = await supabaseClient
        .from("supplier")
        .delete()
        .eq("id", id);

    if (error) {
        alert(error.message);
        return;
    }

    alert("Supplier berjaya dipadam.");

    loadSupplier();

}
// =============================
// CHECK LOGIN USER
// =============================

async function checkUser(){

    const { data, error } = await supabaseClient.auth.getSession();


    if(!data.session){

        window.location.href="index.html";

    }
    else{

        let user = document.getElementById("userEmail");

        if(user){
            user.innerHTML = data.session.user.email;
        }

    }

}




// RUN

checkUser();
// =============================
// Logout
// =============================
function logout() {

    window.location.href = "index.html";

}
