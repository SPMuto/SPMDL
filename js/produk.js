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
