async function loadStokRendah(){


const {data,error}=await supabaseClient
.from("produk")
.select("*")
.order("nama_produk");



if(error){

console.log(error);
return;

}



let rendah = data.filter(p => 
Number(p.stok) <= Number(p.stok_minimum)
);



let habis = data.filter(p =>
Number(p.stok) === 0
);



// CARD

document.getElementById("jumlahRendah").innerHTML =
rendah.length;


document.getElementById("stokHabis").innerHTML =
habis.length;


document.getElementById("jumlahProduk").innerHTML =
data.length;



let html="";



if(rendah.length==0){


html=`

<tr>

<td colspan="9" class="text-center">

Tiada produk stok rendah

</td>

</tr>

`;

}

else{


rendah.forEach(p=>{


let status="";



if(Number(p.stok)==0){

status=`

<span class="badge bg-danger">

HABIS

</span>

`;

}

else{

status=`

<span class="badge bg-warning text-dark">

RENDAH

</span>

`;

}



html +=`

<tr>


<td>
${p.kod_produk}
</td>



<td>

${p.nama_produk}

</td>



<td>

${p.jenama ?? "-"}

</td>



<td>

${p.jenis_motor ?? "-"}

</td>



<td>

${p.no_part ?? "-"}

</td>



<td>

${p.stok}

</td>



<td>

${p.stok_minimum}

</td>



<td>

${status}

</td>



<td>

<a href="produk.html?id=${p.id}" 
class="btn btn-sm btn-primary">

<i class="bi bi-pencil"></i>

</a>

</td>


</tr>


`;


});


}



document.getElementById("senaraiStokRendah").innerHTML=html;


}




async function logout(){

await supabaseClient.auth.signOut();

window.location.href="index.html";

}



loadStokRendah();
