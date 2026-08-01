/const { data } = await supabaseClient.auth.getSession();

if (!data.session) {
    window.location.href = "index.html";
}


async function logout(){

    await supabaseClient.auth.signOut();

    window.location.href = "index.html";

}/ SPMDL
