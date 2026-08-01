// Semak pengguna login

async function checkUser(){

    const { data, error } = await supabaseClient.auth.getSession();

    if(!data.session){

        window.location.href = "index.html";

    } else {

        document.getElementById("userEmail").innerHTML =
        data.session.user.email;

    }

}


// Logout pengguna

async function logout(){

    await supabaseClient.auth.signOut();

    window.location.href = "index.html";

}


// Jalankan semakan

checkUser();
