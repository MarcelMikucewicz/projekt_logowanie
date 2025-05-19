async function logowanie(){
    const login = document.getElementById("login").value;
    const password = document.getElementById("password").value;
    const url = `http://localhost:3000/logowanie/${login}/${password}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.length > 0) {
            document.getElementById("login_info").innerText = "Zalogowano";
            if(data[0].uprawnienia==='admin'){
                localStorage.setItem('user', JSON.stringify(data))
                window.location.href = "admin.html";
            }else{
            localStorage.setItem('user', JSON.stringify(data))
            window.location.href = "user.html";
            }
        } else {
            document.getElementById("login_info").innerText = "Niepoprawne dane";
        }
        console.log(data);
    }