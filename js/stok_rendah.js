// ==========================
// PAPAR PRODUK STOK RENDAH
// ==========================


async function loadStokRendah(){


const {data,error}=await supabaseClient
.from("produk")
.select("*")
.lte("stok","stok_minimum")
.order("nama_produk");



if(error){

console.log(error);

return;

}



let html="";



if(data.length==0){


html=`

<tr>

<td colspan="7" class="text-center">

Tiada produk stok rendah

</td>

</tr>

`;

}

else{


data.forEach(p=>{


let gabungan =
p.nama_produk +
" " +
(p.jenama ?? "") +
" " +
(p.jenis_motor ?? "");



html +=`

<tr>


<td>
${p.kod_produk}
</td>


<td>
${gabungan}
</td>


<td>
${p.jenama ?? "-"}
</td>


<td>
${p.jenis_motor ?? "-"}
</td>


<td>

<span class="badge bg-danger">

${p.stok}

</span>

</td>


<td>
${p.stok_minimum}
</td>


<td>

<span class="badge bg-warning text-dark">

STOK RENDAH

</span>

</td>


</tr>


`;


});


}



document.getElementById("senaraiStokRendah").innerHTML=html;


}





// LOGOUT

async function logout(){

await supabaseClient.auth.signOut();

window.location.href="index.html";

}




loadStokRendah();
