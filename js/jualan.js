let cart = [];


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

<option 
value="${p.id}"
data-harga="${p.harga_jual}"
data-stok="${p.stok}">

${p.nama_produk} (Stok ${p.stok})

</option>

`;

});



document.getElementById("produk_id").innerHTML = html;


}





// ==========================
// TAMBAH CART
// ==========================


function tambahItem(){



let select =
document.getElementById("produk_id");



let id =
select.value;



if(!id){

alert("Pilih produk dahulu");

return;

}



let nama =
select.options[select.selectedIndex].text;



let harga =
Number(
select.options[select.selectedIndex]
.dataset.harga
);



let stok =
Number(
select.options[select.selectedIndex]
.dataset.stok
);



let qty =
Number(
document.getElementById("kuantiti").value
);



if(qty > stok){

alert("Stok tidak mencukupi");

return;

}



cart.push({

produk_id:id,

nama:nama,

kuantiti:qty,

harga:harga,

jumlah:qty*harga

});



paparCart();


}





// ==========================
// PAPAR CART
// ==========================


function paparCart(){


let html="";

let total=0;



cart.forEach(i=>{


total += i.jumlah;


html += `

<tr>

<td>${i.nama}</td>

<td>${i.kuantiti}</td>

<td>RM ${i.harga}</td>

<td>RM ${i.jumlah}</td>

</tr>

`;


});



document.getElementById("cart").innerHTML=html;


document.getElementById("jumlah").innerHTML=total;



}





// ==========================
// SIMPAN JUALAN
// ==========================


async function simpanJualan(){



if(cart.length==0){

alert("Tiada barang");

return;

}



let jumlah =
cart.reduce(
(a,b)=>a+b.jumlah,
0
);



let no_resit =
"RES"+Date.now();




const {data:jualan,error}=await supabaseClient
.from("jualan")
.insert({

no_resit,

jumlah,

jenis_bayaran:
document.getElementById("jenis_bayaran").value

})
.select()
.single();




if(error){

alert(error.message);
return;

}






// SIMPAN DETAIL + UPDATE STOK


for(let item of cart){



await supabaseClient
.from("jualan_detail")
.insert({

jualan_id:jualan.id,

produk_id:item.produk_id,

kuantiti:item.kuantiti,

harga:item.harga,

jumlah:item.jumlah

});





const {data:p}=await supabaseClient
.from("produk")
.select("stok")
.eq("id",item.produk_id)
.single();





await supabaseClient
.from("produk")
.update({

stok:Number(p.stok)-item.kuantiti

})
.eq("id",item.produk_id);



}



alert(
"Jualan berjaya. Resit: "+no_resit
);

window.location.href =
"resit.html?id="+jualan.id;



}






// ==========================
// LOGOUT
// ==========================


async function logout(){

await supabaseClient.auth.signOut();

window.location.href="index.html";

}





// START

loadProduk();
