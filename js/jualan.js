// ==========================
// SPMDR - JUALAN POS
// ==========================


let semuaProduk = [];

let cart = [];




// ==========================
// LOAD PRODUK
// ==========================

async function loadProduk(){


const {data,error}=await supabaseClient

.from("produk")

.select("*")

.eq("status","AKTIF")

.order("nama_produk");



if(error){

console.log(error);

return;

}



semuaProduk = data;


}



// ==========================
// CARI PRODUK
// ==========================

function cariProduk(){


let keyword = 

document
.getElementById("cariProduk")
.value
.toLowerCase();



let hasil="";



if(keyword.length < 2){

document.getElementById("hasilProduk").innerHTML="";

return;

}




semuaProduk

.filter(p=>{


let carian = `

${p.nama_produk}

${p.jenama ?? ""}

${p.jenis_motor ?? ""}

${p.no_part ?? ""}

${p.barcode ?? ""}

`

.toLowerCase();



return carian.includes(keyword);



})

.slice(0,10)

.forEach(p=>{



let nama =

`${p.nama_produk}

${p.jenama ?? ""}

${p.jenis_motor ?? ""}`;



hasil += `


<button

class="list-group-item list-group-item-action"

onclick='pilihProduk(${JSON.stringify(p)})'>


<b>${nama}</b>


<br>


Kod : ${p.kod_produk}


<br>


Barcode : ${p.barcode ?? "-"}


<br>


Harga : RM ${p.harga_jual}


<br>


Stok : ${p.stok}


</button>



`;



});




document
.getElementById("hasilProduk")
.innerHTML = hasil;


}







// ==========================
// PILIH PRODUK
// ==========================

function pilihProduk(p){



document
.getElementById("produk_id")
.value=p.id;




document
.getElementById("harga")
.value=p.harga_jual;




document
.getElementById("cariProduk")
.value =


`${p.nama_produk} 
${p.jenama ?? ""} 
${p.jenis_motor ?? ""}`;



document
.getElementById("hasilProduk")
.innerHTML="";



document
.getElementById("kuantiti")
.focus();


}







// ==========================
// TAMBAH ITEM
// ==========================


function tambahItem(){



let id =

document
.getElementById("produk_id")
.value;




let nama =

document
.getElementById("cariProduk")
.value;



let harga =

Number(
document
.getElementById("harga")
.value
);



let qty =

Number(
document
.getElementById("kuantiti")
.value
);





if(!id){

alert("Sila pilih produk");

return;

}





if(qty<=0){

alert("Kuantiti tidak sah");

return;

}






let item = cart.find(

x=>x.produk_id==id

);





if(item){



item.kuantiti += qty;


item.jumlah =

item.kuantiti *

item.harga;



}else{



cart.push({


produk_id:id,


nama:nama,


kuantiti:qty,


harga:harga,


jumlah:qty*harga


});



}




paparCart();





// reset carian


document
.getElementById("cariProduk")
.value="";

document
.getElementById("produk_id")
.value="";

document
.getElementById("harga")
.value="";



document
.getElementById("kuantiti")
.value=1;



}








// ==========================
// PAPAR CART
// ==========================

function paparCart(){



let html="";


let total=0;





cart.forEach((i,index)=>{



total += i.jumlah;





html += `


<tr>


<td>

${i.nama}

</td>



<td>


<button

class="btn btn-sm btn-danger"

onclick="kurangQty(${index})">


-

</button>



${i.kuantiti}




<button

class="btn btn-sm btn-success"

onclick="tambahQty(${index})">


+

</button>



</td>




<td>

RM ${i.jumlah.toFixed(2)}

</td>




</tr>


`;



});





document
.getElementById("cart")
.innerHTML=html;




document
.getElementById("jumlah")
.innerHTML=
total.toFixed(2);



}








// ==========================
// PLUS MINUS CART
// ==========================

function tambahQty(index){


cart[index].kuantiti++;


cart[index].jumlah =

cart[index].kuantiti *

cart[index].harga;


paparCart();


}





function kurangQty(index){


cart[index].kuantiti--;



if(cart[index].kuantiti<=0){


cart.splice(index,1);


}

else{


cart[index].jumlah =

cart[index].kuantiti *

cart[index].harga;


}



paparCart();


}








// ==========================
// SIMPAN JUALAN
// ==========================


async function simpanJualan(){



if(cart.length==0){

alert("Cart kosong");

return;

}




let jumlah =

cart.reduce(

(a,b)=>a+b.jumlah,

0

);





let no_resit =

"RES"+Date.now();






const {data:jualan,error}=

await supabaseClient

.from("jualan")

.insert({

no_resit:no_resit,

jumlah:jumlah,

jenis_bayaran:

document
.getElementById("jenis_bayaran")
.value


})

.select()

.single();





if(error){

alert(error.message);

return;

}








// DETAIL + UPDATE STOK


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






const {data:stokProduk}=

await supabaseClient

.from("produk")

.select("stok")

.eq("id",item.produk_id)

.single();





await supabaseClient

.from("produk")

.update({

stok:

Number(stokProduk.stok)

-

item.kuantiti


})

.eq("id",item.produk_id);



}






alert(

"Jualan berjaya"

);





window.location.href=

"resit.html?id="+jualan.id;



}








// ==========================
// BARCODE ENTER
// ==========================


document
.getElementById("cariProduk")
.addEventListener(

"keypress",

async function(e){



if(e.key==="Enter"){



let code=this.value.trim();




const {data}=

await supabaseClient

.from("produk")

.select("*")

.eq("barcode",code)

.single();





if(data){


pilihProduk(data);


}

else{


cariProduk();


}



}



});








// ==========================
// LIVE SEARCH
// ==========================


document
.getElementById("cariProduk")
.addEventListener(

"keyup",

cariProduk

);








// ==========================
// LOGOUT
// ==========================

async function logout(){


await supabaseClient.auth.signOut();


window.location.href="index.html";


}






// START

loadProduk();
