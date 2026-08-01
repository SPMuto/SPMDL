// ==========================
// LOAD PRODUK
// ==========================

async function loadProduk(){


const { data, error } = await supabaseClient
.from("produk")
.select(`
    *,
    supplier(
        nama_supplier
    )
`)
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

<td>${p.supplier?.nama_supplier ?? "-"}</td>

<td>${p.lokasi_rak ?? "-"}</td>

<td>${p.stok ?? 0}</td>

<td>RM ${p.harga_jual ?? 0}</td>

<td>${p.status ?? "-"}</td>


<td>


<button 
class="btn btn-sm btn-warning"
onclick="editProduk(${p.id})">
Edit
</button>



<button 
class="btn btn-sm btn-danger"
onclick="padamProduk(${p.id})">
Padam
</button>


</td>


</tr>


`;

});



document.getElementById("senaraiProduk").innerHTML = html;


}





// ==========================
// LOAD SUPPLIER
// ==========================


async function loadSupplier(){


const { data,error } = await supabaseClient
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
// TAMBAH PRODUK
// ==========================


async function tambahProduk(){


const produk = {


kod_produk:
kod_produk.value,


barcode:
barcode.value,


no_part:
no_part.value,


nama_produk:
nama_produk.value,


jenama:
jenama.value,


jenis_motor:
jenis_motor.value,


kategori:
kategori.value,


unit:
unit.value,


lokasi_rak:
lokasi_rak.value,


supplier_id:
supplier_id.value || null,


harga_modal:
Number(harga_modal.value || 0),


harga_jual:
Number(harga_jual.value || 0),


stok:
Number(stok.value || 0),


stok_minimum:
Number(stok_minimum.value || 0),


status:
status.value,


catatan:
catatan.value

};



const {error}=await supabaseClient
.from("produk")
.insert(produk);



if(error){

alert(error.message);

}

else{

alert("Produk berjaya ditambah");

location.reload();

}


}







// ==========================
// EDIT PRODUK
// ==========================


async function editProduk(id){


const {data,error}=await supabaseClient
.from("produk")
.select("*")
.eq("id",id)
.single();



if(error){

alert(error.message);
return;

}



let nama = prompt(
"Nama Produk",
data.nama_produk
);



if(nama==null) return;



const {error:updateError}=await supabaseClient
.from("produk")
.update({

nama_produk:nama

})
.eq("id",id);



if(updateError){

alert(updateError.message);

}

else{

alert("Produk berjaya dikemaskini");

loadProduk();

}


}







// ==========================
// PADAM PRODUK
// ==========================


async function padamProduk(id){



if(!confirm("Padam produk ini?"))
return;



const {error}=await supabaseClient
.from("produk")
.delete()
.eq("id",id);



if(error){

alert(error.message);

}

else{

alert("Produk dipadam");

loadProduk();

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
