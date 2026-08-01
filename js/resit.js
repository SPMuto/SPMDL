// ==========================
// AMBIL ID JUALAN
// ==========================

const urlParams = new URLSearchParams(window.location.search);

const jualan_id = urlParams.get("id");




// ==========================
// LOAD RESIT
// ==========================

async function loadResit(){


if(!jualan_id){

alert("Resit tidak dijumpai");

return;

}




// Ambil maklumat jualan

const {data:jualan,error}=await supabaseClient

.from("jualan")

.select("*")

.eq("id",jualan_id)

.single();




if(error){

console.log(error);

alert(error.message);

return;

}





document.getElementById("no_resit").innerHTML =
jualan.no_resit;



document.getElementById("tarikh").innerHTML =
jualan.tarikh;



document.getElementById("jumlah").innerHTML =
jualan.jumlah;



document.getElementById("bayaran").innerHTML =
jualan.jenis_bayaran;







// Ambil detail barang


const {data:detail,error:errDetail}=await supabaseClient

.from("jualan_detail")

.select(`

*,

produk(
nama_produk
)

`)

.eq("jualan_id",jualan_id);





if(errDetail){

console.log(errDetail);

return;

}





let html="";




detail.forEach(d=>{


html += `

<tr>

<td>
${d.produk?.nama_produk ?? "-"}
</td>


<td>
${d.kuantiti}
</td>


<td>
RM ${d.harga}
</td>


<td>
RM ${d.jumlah}
</td>


</tr>

`;



});




document.getElementById("senaraiResit").innerHTML = html;



}






// ==========================
// LOGOUT
// ==========================

async function logout(){

await supabaseClient.auth.signOut();

window.location.href="index.html";

}




loadResit();
