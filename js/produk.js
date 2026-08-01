async function loadProduk(){


const { data, error } = await supabaseClient
.from("produk")
.select("*")
.order("id",{ascending:false});


if(error){

console.log(error);
return;

}



let html="";


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


loadProduk();


async function tambahProduk(){


const produk = {

kod_produk:
document.getElementById("kod_produk").value,

barcode:
document.getElementById("barcode").value,

nama_produk:
document.getElementById("nama_produk").value,

jenama:
document.getElementById("jenama").value,

jenis_motor:
document.getElementById("jenis_motor").value,

kategori:
document.getElementById("kategori").value,

stok:
Number(document.getElementById("stok").value),

harga_jual:
Number(document.getElementById("harga_jual").value)

};



const {error} = await supabaseClient
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
