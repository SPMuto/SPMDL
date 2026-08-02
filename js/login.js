document.getElementById("loginForm").addEventListener("submit", async function(e){

    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password
    });
console.log(data);
console.log(error);
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

function togglePassword(){

    const pass=document.getElementById("password");

    const icon=document.getElementById("eye");

    if(pass.type==="password"){

        pass.type="text";
        icon.className="bi bi-eye-slash";

    }else{

        pass.type="password";
        icon.className="bi bi-eye";

    }

}


function togglePassword(){

    const pass=document.getElementById("password");
    const eye=document.getElementById("eye");

    if(pass.type==="password"){

        pass.type="text";
        eye.className="bi bi-eye-slash";

    }else{

        pass.type="password";
        eye.className="bi bi-eye";

    }

}

document.getElementById("loginForm").addEventListener("submit", async function(e){

    e.preventDefault();

    const btn=document.getElementById("loginBtn");

    btn.disabled=true;

    btn.innerHTML='<span class="spinner-border spinner-border-sm"></span> Login...';

    const email=document.getElementById("email").value;

    const password=document.getElementById("password").value;

    const {error}=await supabaseClient.auth.signInWithPassword({
        email,
        password
    });

    if(error){

        document.getElementById("message").innerHTML=
        error.message;

        btn.disabled=false;

        btn.innerHTML='<i class="bi bi-box-arrow-in-right"></i> Log Masuk';

        return;

    }

    window.location.href="dashboard.html";

});
