async function checkUser(){

    const {data}=await supabaseClient.auth.getSession();

    if(!data.session){

        window.location="login.html";

        return;

    }

    const user=document.getElementById("userEmail");

    if(user){

        user.innerHTML=data.session.user.email;

    }

}

async function logout(){

    await supabaseClient.auth.signOut();

    window.location="login.html";

}
