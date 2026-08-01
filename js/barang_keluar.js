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



let html=`

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



document.getElementById("produk_id").innerHTML=html;


}





// ==========================
// SIMPAN BARANG KELUAR
// ==========================


async function simpanBarangKeluar(){



let produk_id =
document.getElementById("produk_id").value;



let kuantiti =
Number(document.getElementById("kuantiti").value);



let tarikh =
document.getElementById("tarikh").value;



let catatan =
document.getElementById("catatan").value;





if(!produk_id || kuantiti <= 0){

alert("Sila pilih produk dan masukkan kuantiti");

return;

}





// SEMAK STOK


const {data:produk,error}=await supabaseClient
.from("produk")
.select("stok")
.eq("id",produk_id)
.single();




if(error){

alert(error.message);
return;

}





if(produk.stok < kuantiti){

alert(
"Stok tidak mencukupi. Stok semasa: "
+ produk.stok
);

return;

}





// SIMPAN TRANSAKSI


const {error:errInsert}=await supabaseClient
.from("barang_keluar")
.insert({

tarikh,

produk_id,

kuantiti,

catatan

});





if(errInsert){

alert(errInsert.message);
return;

}





// UPDATE STOK


let stokBaru =
Number(produk.stok)-kuantiti;



const {error:errUpdate}=await supabaseClient
.from("produk")
.update({

stok:stokBaru

})
.eq("id",produk_id);




if(errUpdate){

alert(errUpdate.message);
return;

}





alert("Barang keluar berjaya");


location.reload();



}







// ==========================
// PAPAR REKOD
// ==========================


async function loadBarangKeluar(){



const {data,error}=await supabaseClient
.from("barang_keluar")
.select(`

*,

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

<td>${b.produk?.nama_produk ?? "-"}</td>

<td>${b.kuantiti ?? 0}</td>

<td>${b.catatan ?? ""}</td>

</tr>


`;



});





document.getElementById("senaraiKeluar").innerHTML=html;



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

loadBarangKeluar();
