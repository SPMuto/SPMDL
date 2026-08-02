// =============================
// SPMDR DASHBOARD
// =============================


// =============================
// SEMAK LOGIN
// =============================

async function checkUser(){

    const { data, error } = await supabaseClient.auth.getSession();


    if(!data.session){

        window.location.href = "index.html";
        return;

    }


    let userEmail = document.getElementById("userEmail");


    if(userEmail){

        userEmail.innerHTML =
        data.session.user.email;

    }


    loadDashboard();

}



// =============================
// LOAD SEMUA DATA DASHBOARD
// =============================

async function loadDashboard(){

    jumlahProduk();

    nilaiStok();

    stokRendah();

    jualanHariIni();

}



// =============================
// JUMLAH PRODUK
// =============================

async function jumlahProduk(){


    const { data, error } = await supabaseClient
    .from("produk")
    .select("id");


    if(error){

        console.log(error);
        return;

    }


    document.getElementById("jumlahProduk").innerHTML =
    data.length;


}



// =============================
// NILAI STOK
// harga_modal x stok
// =============================

async function nilaiStok(){


    const { data, error } = await supabaseClient
    .from("produk")
    .select("harga_modal, stok");


    if(error){

        console.log(error);
        return;

    }


    let jumlah = 0;


    data.forEach(item=>{


        jumlah +=
        Number(item.harga_modal || 0) *
        Number(item.stok || 0);


    });



    document.getElementById("nilaiStok").innerHTML =

    "RM " + jumlah.toLocaleString("ms-MY",{

        minimumFractionDigits:2

    });


}



// =============================
// STOK RENDAH
// =============================

async function stokRendah(){


    const { data,error } = await supabaseClient
    .from("produk")
    .select("stok,stok_minimum");


    if(error){

        console.log(error);
        return;

    }


    let jumlah = 0;


    data.forEach(item=>{


        if(item.stok <= item.stok_minimum){

            jumlah++;

        }


    });



    document.getElementById("stokRendah").innerHTML =
    jumlah;


}



// =============================
// JUALAN HARI INI
// =============================

async function jualanHariIni(){


    let tarikhHariIni =
    new Date().toISOString().split("T")[0];



    const {data,error} = await supabaseClient
    .from("jualan")
    .select("jumlah")
    .eq("tarikh",tarikhHariIni);



    if(error){

        console.log(error);
        return;

    }



    let jumlah = 0;


    data.forEach(item=>{


        jumlah += Number(item.jumlah || 0);


    });



    document.getElementById("jualanHariIni").innerHTML =

    "RM " + jumlah.toLocaleString("ms-MY",{

        minimumFractionDigits:2

    });



}



// =============================
// LOGOUT
// =============================

async function logout(){

    await supabaseClient.auth.signOut();

    window.location.href="index.html";

}



// =============================
// START
// =============================

checkUser();
