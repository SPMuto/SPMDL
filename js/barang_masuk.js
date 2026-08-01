// ==========================
// LOAD SUPPLIER
// ==========================

async function loadSupplier(){


const {data,error}=await supabaseClient
.from("supplier")
.select("*")
.order("nama_supplier");



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
// LOAD PRODUK
// ==========================

async function loadProduk(){


const {data,error}=await supabaseClient
.from("produk")
.select("*")
.order("nama_produk");



if(error){

console.log(error);
return;

}



let html = `
<option value="">
Pilih Produk
</option>
`;



data.forEach(p=>{


html += `

<option value="${p.id}">
${p.nama_produk} (Stok: ${p.stok})
</option>

`;

});



document.getElementById("produk_id").innerHTML = html;


}





// ==========================
// SIMPAN BARANG MASUK
// ==========================


async function simpanBarangMasuk(){



let produk_id =
document.getElementById("produk_id").value;



let kuantiti =
Number(document.getElementById("kuantiti").value);



let harga_beli =
Number(document.getElementById("harga_beli").value || 0);



let supplier_id =
document.getElementById("supplier_id").value || null;



let tarikh =
document.getElementById("tarikh").value;



let catatan =
document.getElementById("catatan").value;





// SIMPAN TRANSAKSI


const {error}=await supabaseClient
.from("barang_masuk")
.insert({

tarikh,
supplier_id,
produk_id,
kuantiti,
harga_beli,
catatan

});



if(error){

alert(error.message);
console.log(error);
return;

}





// UPDATE STOK PRODUK


const {data:produk,error:errProduk}=await supabaseClient
.from("produk")
.select("stok")
.eq("id",produk_id)
.single();



if(errProduk){

alert(errProduk.message);
return;

}



let stokBaru =
(Number(produk.stok) + kuantiti);




await supabaseClient
.from("produk")
.update({

stok:stokBaru

})
.eq("id",produk_id);





alert("Barang masuk berjaya");


location.reload();



}






// ==========================
// PAPAR SENARAI MASUK
// ==========================


async function loadBarangMasuk(){



const {data,error}=await supabaseClient
.from("barang_masuk")
.select(`

*,

supplier(
nama_supplier
),

produk(
nama_produk
)

`)
.order("id",{ascending:false});




if(error){

console.log(error);
return;

}



let html="";



data.forEach(b=>{


html += `

<tr>

<td>${b.tarikh ?? ""}</td>

<td>${b.supplier?.nama_supplier ?? "-"}</td>

<td>${b.produk?.nama_produk ?? "-"}</td>

<td>${b.kuantiti ?? 0}</td>

<td>RM ${b.harga_beli ?? 0}</td>

</tr>

`;



});



document.getElementById("senaraiMasuk").innerHTML=html;


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


loadSupplier();

loadProduk();

loadBarangMasuk();
