document.getElementById("loginForm").addEventListener("submit", async function(e){

    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password
    });

    if(error){
        document.getElementById("message").innerHTML =
        "Login gagal: " + error.message;
    }
    else{
        document.getElementById("message").innerHTML =
        "Login berjaya";

        window.location.href="dashboard.html";
    }

});
