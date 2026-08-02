// ======================================
// SPMDR - STOK RENDAH
// ======================================

// Semak login
checkUser();

// Muatkan data
loadStokRendah();


// ======================================
// LOAD DATA
// ======================================

async function loadStokRendah() {

    const { data, error } = await supabaseClient
        .from("produk")
        .select("*")
        .order("nama_produk", { ascending: true });

    if (error) {
        console.log(error);
        return;
    }

    let jumlahProduk = data.length;
    let jumlahRendah = 0;
    let stokHabis = 0;

    let html = "";

    data.forEach(item => {

        let stok = Number(item.stok);
        let minimum = Number(item.stok_minimum);

        if (stok <= minimum) {

            jumlahRendah++;

            let badge = "";

            if (stok == 0) {

                stokHabis++;

                badge = `
                <span class="badge bg-danger">
                    HABIS
                </span>
                `;

            } else {

                badge = `
                <span class="badge bg-warning text-dark">
                    RENDAH
                </span>
                `;

            }

            html += `
            <tr>

                <td>${item.kod_produk}</td>

                <td>${item.nama_produk}</td>

                <td>${item.jenama ?? "-"}</td>

                <td>${item.jenis_motor ?? "-"}</td>

                <td>${item.no_part ?? "-"}</td>

                <td class="text-center fw-bold">

                    ${stok}

                </td>

                <td class="text-center">

                    ${minimum}

                </td>

                <td>

                    ${badge}

                </td>

                <td>

                    <a href="produk.html"
                    class="btn btn-sm btn-primary">

                        <i class="bi bi-pencil"></i>

                    </a>

                </td>

            </tr>
            `;

        }

    });

    if (html == "") {

        html = `
        <tr>

            <td colspan="9" class="text-center text-success">

                🎉 Tiada produk stok rendah.

            </td>

        </tr>
        `;

    }

    document.getElementById("senaraiStokRendah").innerHTML = html;

    document.getElementById("jumlahProduk").innerHTML = jumlahProduk;

    document.getElementById("jumlahRendah").innerHTML = jumlahRendah;

    document.getElementById("stokHabis").innerHTML = stokHabis;

}
