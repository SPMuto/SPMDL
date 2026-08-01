async function loadProduk(){


const { data, error } = await supabaseClient
.from("produk")
.select("*")
.order("id",{ascending:false});


if(error){

    console.log(error);
    return;

}


let html = "";


data.forEach(p=>{


html += `

<tr>

<td>${p.kod_produk ?? ""}</td>

<td>${p.barcode ?? ""}</td>

<td>${p.nama_produk ?? ""}</td>

<td>${p.jenama ?? ""}</td>

<td>${p.jenis_motor ?? ""}</td>

<td>${p.stok ?? 0}</td>

<td>RM ${p.harga_jual ?? 0}</td>


<td>

<button class="btn btn-sm btn-warning">
Edit
</button>

<button class="btn btn-sm btn-danger">
Padam
</button>

</td>

</tr>

`;

});


document.getElementById("senaraiProduk").innerHTML = html;


}




// ==========================
// LOAD SUPPLIER DROPDOWN
// ==========================

async function loadSupplier(){


const { data, error } = await supabaseClient
.from("supplier")
.select("*")
.order("nama_supplier");



console.log("Supplier:",data);
console.log("Error:",error);



if(error){

    console.log(error);
    return;

}



let html = `
<option value="">
Pilih Supplier
</option>
`;



data.forEach(s=>{


html += `

<option value="${s.id}">
${s.nama_supplier}
</option>

`;


});



document.getElementById("supplier_id").innerHTML = html;


}





// ==========================
// TAMBAH PRODUK
// ==========================


async function tambahProduk(){



const produk = {


kod_produk:
document.getElementById("kod_produk").value,


barcode:
document.getElementById("barcode").value,


no_part:
document.getElementById("no_part").value,


nama_produk:
document.getElementById("nama_produk").value,


jenama:
document.getElementById("jenama").value,


jenis_motor:
document.getElementById("jenis_motor").value,


kategori:
document.getElementById("kategori").value,


unit:
document.getElementById("unit").value,


lokasi_rak:
document.getElementById("lokasi_rak").value,



supplier_id:
document.getElementById("supplier_id").value || null,



harga_modal:
Number(document.getElementById("harga_modal").value || 0),



harga_jual:
Number(document.getElementById("harga_jual").value || 0),



stok:
Number(document.getElementById("stok").value || 0),



stok_minimum:
Number(document.getElementById("stok_minimum").value || 0),



status:
document.getElementById("status").value,



catatan:
document.getElementById("catatan").value


};




const {error} = await supabaseClient
.from("produk")
.insert(produk);



if(error){


alert(error.message);

console.log(error);


}

else{


alert("Produk berjaya ditambah");


location.reload();


}


}





// ==========================
// LOGOUT
// ==========================


async function logout(){


await supabaseClient.auth.signOut();


window.location.href="index.html";


}





// ==========================
// START
// ==========================


loadProduk();

loadSupplier();
