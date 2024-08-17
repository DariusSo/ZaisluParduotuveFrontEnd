function setCookie(name, value) {
    document.cookie = name + "=" + (value || "") + "; path=/";
}
    async function fetchCookie() {
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        try {
            const response = await fetch('http://127.0.0.1:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    name : email,
                    password: password,
                    })
            });
        
            const token = await response.text();
            
            if(response.status = 200){
              setCookie("loggedIn", token);
              window.location.href = "./administration.html"
          }else{
              
            }
            
        } catch (error) {
          console.log(error);
        }
}